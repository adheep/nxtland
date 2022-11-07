const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
    {
      serverUrl: "http://localhost:9000",
      token: "ecb1c5f56fa456406b8dee0ac77234767742156a",
      options: {
        "sonar.sources": "./src",
        //"sonar.test.inclusions"="**/*.test.js",
        "sonar.exclusions": "**/__tests__/**",
        "sonar.tests": "D:/workspace/Framework/expleocore/client/react/src/App.test.tsx",
        "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts,./src/App.test.tsx,D:/workspace/Framework/expleocore/client/react/src/App.test.tsx,./src/App.test.tsx",
        "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
        "sonar.testExecutionReportPaths": "reports/test-report.xml",
      },
    },
    () => {},
  );