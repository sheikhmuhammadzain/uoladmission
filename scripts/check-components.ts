import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

// Define the components to check
const componentsToCheck = [
  {
    path: 'components/ui/macbook-scroll.tsx',
    name: 'MacbookScroll Component',
    dependencies: ['motion', '@tabler/icons-react']
  },
  {
    path: 'components/macbook-scroll-demo.tsx',
    name: 'MacbookScrollDemo Component',
    dependencies: []
  },
  {
    path: 'public/admission-dashboard.jpg',
    name: 'Dashboard Image',
    dependencies: [],
    optional: true
  }
];

// Check if package.json has the required dependencies
function checkDependencies(dependencies: string[]): { missing: string[], installed: string[] } {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error(chalk.red('Error: package.json not found'));
    process.exit(1);
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const allDependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const missing: string[] = [];
  const installed: string[] = [];
  
  dependencies.forEach(dep => {
    if (allDependencies[dep]) {
      installed.push(dep);
    } else {
      missing.push(dep);
    }
  });
  
  return { missing, installed };
}

// Check if a file exists
function checkFileExists(filePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

// Main function to check components
function checkComponents() {
  console.log(chalk.blue('Checking MacBook Scroll Component Setup...'));
  console.log('');
  
  let allGood = true;
  
  componentsToCheck.forEach(component => {
    const fileExists = checkFileExists(component.path);
    
    if (fileExists) {
      console.log(`${chalk.green('✓')} ${component.name} found at ${component.path}`);
    } else if (component.optional) {
      console.log(`${chalk.yellow('!')} ${component.name} not found at ${component.path} (optional)`);
      if (component.path.includes('admission-dashboard.webp')) {
        console.log(`  ${chalk.yellow('Note:')} You need to create a dashboard image at ${component.path}`);
      }
      allGood = false;
    } else {
      console.log(`${chalk.red('✗')} ${component.name} not found at ${component.path}`);
      allGood = false;
    }
    
    if (component.dependencies.length > 0) {
      const { missing, installed } = checkDependencies(component.dependencies);
      
      if (missing.length === 0) {
        console.log(`  ${chalk.green('✓')} All dependencies installed: ${installed.join(', ')}`);
      } else {
        console.log(`  ${chalk.red('✗')} Missing dependencies: ${missing.join(', ')}`);
        console.log(`  ${chalk.yellow('Run:')} npm install ${missing.join(' ')}`);
        allGood = false;
      }
    }
    
    console.log('');
  });
  
  if (allGood) {
    console.log(chalk.green('All components are properly set up!'));
  } else {
    console.log(chalk.yellow('Some components need attention. Please check the issues above.'));
  }
}

// Run the check
checkComponents(); 