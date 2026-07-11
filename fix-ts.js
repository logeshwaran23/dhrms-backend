const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Fix query param casts
      if (content.match(/req\.query\.\w+ as string/g)) {
        content = content.replace(/(req\.query\.\w+) as string/g, '$1 as any as string');
        changed = true;
      }

      // Fix `employeeId` assignment where it complains about string | undefined
      if (content.includes("employeeId: req.user!.employeeId,")) {
        content = content.replace(/employeeId: req\.user!\.employeeId,/g, 'employeeId: req.user!.employeeId!,');
        changed = true;
      }
      if (content.includes("employeeId: req.user?.employeeId,")) {
        content = content.replace(/employeeId: req\.user\?\.employeeId,/g, 'employeeId: req.user?.employeeId!,');
        changed = true;
      }

      // Additional fixes for arguments in controllers:
      // req.user!.employeeId being passed to functions expecting string
      if (content.match(/req\.user!\.employeeId\)/g)) {
        content = content.replace(/req\.user!\.employeeId\)/g, 'req.user!.employeeId!)');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
