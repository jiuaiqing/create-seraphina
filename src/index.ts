#!/usr/bin/env node
 
import prompts from "prompts"; //引入控制台输入
import path from "node:path"; //引入路径
import fs from "node:fs"; //引入文件
import chalk from "chalk";  //引入控制台颜色
const bootstrap = async () => {
    console.log(chalk.cyan("Welcome to seraphina!"));
    const result =  await prompts([
        {
            type: "text",
            name: "projectName",
            message: "请输入项目名称:"
        },
    ]);
    //管理控制台输入
    //————————————————————————————————————————————————————————————————————————————————————————————————
    const targetPath = path.resolve(process.cwd(), result.projectName);
    const sourcePath = path.resolve(__dirname, "../template");
    // Copy files from sourcePath to targetPath
    fs.cpSync(sourcePath, targetPath, { recursive: true });
    // Update package.json
    const packageJsonPath = path.resolve(targetPath, 'package.json');
    const packageJson = require(packageJsonPath);
    packageJson.name = result.projectName;
    // Write the updated package.json back to the file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    // Rename _gitignore to .gitignore
    fs.renameSync(
        path.resolve(targetPath, "_gitignore"),
        path.resolve(targetPath, ".gitignore")
    );
    //————————————————————————————————————————————————————————————————————————————————————————————————
    //最后输出
    console.log(`
    Project initialization completed!
    cd ${result.projectName}
    pnpm i
    pnpm run dev
    `)
};
bootstrap();