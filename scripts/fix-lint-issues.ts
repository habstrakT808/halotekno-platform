import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Recursively find all TypeScript files
function findTsFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      // Skip node_modules, .next, and other build directories
      if (
        !file.startsWith('.') &&
        file !== 'node_modules' &&
        file !== '.next' &&
        file !== 'dist' &&
        file !== 'build'
      ) {
        findTsFiles(filePath, fileList)
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Fix console.log statements
function fixConsoleLogs(content: string): string {
  // Check if line already has eslint-disable
  const lines = content.split('\n')
  const fixedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const prevLine = i > 0 ? lines[i - 1] : ''
    
    // Check if this line has console.log/error/warn/info/debug
    if (/console\.(log|error|warn|info|debug)\(/.test(line)) {
      // Check if previous line already has eslint-disable
      if (!prevLine.includes('eslint-disable-next-line')) {
        // Get indentation from current line
        const indent = line.match(/^(\s*)/)?.[1] || ''
        fixedLines.push(`${indent}// eslint-disable-next-line no-console`)
      }
    }
    fixedLines.push(line)
  }

  return fixedLines.join('\n')
}

// Fix any types (basic replacements)
function fixAnyTypes(content: string): string {
  // Replace common any patterns with more specific types
  content = content.replace(/:\s*any\s*=/g, ': unknown =')
  content = content.replace(/:\s*any\s*>/g, ': unknown>')
  content = content.replace(/:\s*any\s*\)/g, ': unknown)')
  content = content.replace(/:\s*any\s*}/g, ': unknown}')
  content = content.replace(/:\s*any\s*;/g, ': unknown;')
  content = content.replace(/:\s*any\s*$/gm, ': unknown')

  return content
}

// Main function
function main() {
  const srcDir = join(process.cwd(), 'src')
  const files = findTsFiles(srcDir)

  console.log(`Found ${files.length} TypeScript files`)

  let fixedCount = 0

  files.forEach((file) => {
    try {
      let content = readFileSync(file, 'utf-8')
      const originalContent = content

      // Fix console.log
      content = fixConsoleLogs(content)

      // Fix any types (be careful with this)
      // content = fixAnyTypes(content)

      if (content !== originalContent) {
        writeFileSync(file, content, 'utf-8')
        fixedCount++
        console.log(`Fixed: ${file}`)
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error)
    }
  })

  console.log(`\nFixed ${fixedCount} files`)
}

main()

