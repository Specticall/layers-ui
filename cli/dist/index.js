#!/usr/bin/env node
import{Command as Se}from"commander";import{Command as me}from"commander";import v from"chalk";var l={error(...e){console.log(v.red(...e))},warn(...e){console.log(v.yellow(...e))},info(...e){console.log(v.cyan(...e))},success(...e){console.log(v.green(...e))},break(){console.log("")}};import{z as I}from"zod";import{z as g}from"zod";import Z from"fs/promises";var ee=g.object({path:g.object({utils:g.string({message:"utils path is missing"}),components:g.string({message:"components path is missing"})},{message:"`path` config is missing "}),using:g.enum(["vite","cra","next"])});async function k(){let e=process.cwd(),t=await Z.readFile(`${e}/components.json`,"utf-8"),s=JSON.parse(t),n=ee.safeParse(s);if(!n.success)throw new Error("Invalid configuration file");return n.data}import pe from"prompts";function b(e,t,s){return e.split(t).map(o=>`${o.split("")[0].toUpperCase()}${o.slice(1)}`).join(s||"")}import te from"ora";import se from"path";import A from"fs/promises";async function m(e){try{return await A.stat(e),!0}catch{return!1}}async function U({path:e,file:t,name:s,replace:n}){let o=`${e}/${s}`;return await m(o)&&!n?!1:(await A.writeFile(o,t),!0)}function _(e,t){return e.replace("@/components/ui",`${t.components.replace("/src","@")}`).replace("@/utils/lib",`${t.utils.replace("/src","@")}`)}async function L(e,t,s){let n=te(`Writing ${e.name}...`).start(),o=b(e.name,"-")+".tsx";await U({path:se.resolve(process.cwd(),"."+t.path.components),name:o,file:_(e.content,t.path),replace:s?.replace})?n.succeed(`Successfuly inserted ${b(e.name,"-"," ")}.`):n.stop()}import ge from"chalk";import J from"ora";import{execa as D}from"execa";import ne from"path";import O from"fs/promises";var oe="import 'react-loading-skeleton/dist/skeleton.css'",z={"react-loading-skeleton":async e=>{if(e.using==="vite"){let t=ne.resolve(process.cwd(),"./src/main.tsx"),s=await O.readFile(t,"utf-8");s.includes("react-loading-skeleton/dist/skeleton.css")||await O.writeFile(t,`${oe}
${s}`)}}};async function N(e,t){if(e in z){let s=z[e];await s(t)}}import ie from"fs/promises";import re from"path";async function x(){let e=re.resolve(process.cwd(),"package.json"),t=JSON.parse(await ie.readFile(e,"utf-8"));return[...Object.keys(t.dependencies||{}),...Object.keys(t.devDependencies||{})]}async function C({dependencies:e,devDependencies:t}){let s=await x(),n=e.filter(i=>!s.includes(i)),o=t.filter(i=>!s.includes(i)),r=await k();n.forEach(i=>N(i,r)),o.forEach(i=>N(i,r)),o.length>0&&await D("npm",["install","-D",...o],{cwd:process.cwd()}),n.length>0&&await D("npm",["install",...n],{cwd:process.cwd()})}import{z as j}from"zod";import ae from"axios";var W="https://layers-ui-registry.vercel.app/";var P=ae.create({baseURL:W});var ce=j.object({data:j.array(j.string())});async function B(){let e=await P.get("/names");return ce.parse(e?.data).data}import{z as c}from"zod";var le=c.object({components:c.array(c.object({name:c.string(),content:c.string()})),dependencies:c.array(c.string()),devDependencies:c.array(c.string())});async function G(e){let t=await P.get(`?components=${e.join(",")}`);return le.parse(t?.data)}var fe=I.object({components:I.array(I.string())}),Y=new me().name("add").description("adds component to your project").argument("[inputComponents...]","components to add").action(de);async function de(e){try{let t=await k(),s=fe.parse({components:e}),n=await B(),o=[],r=[];s.components.forEach(a=>{n.includes(a)?o.push(a):r.push(a)}),r.length>0&&console.log(ge.yellow("Ignoring Invalid Component Names:"),r.join(", "));let i=o;if(s.components.length<=0){let{components:a}=await pe({instructions:!1,type:"multiselect",hint:"Press [space] to select, [a] to select all, [enter] to submit",name:"components",message:"Select components",choices:n.map(q=>({title:q,value:q}))});i=a}if(i.length<=0){l.info("No valid components selected, exiting.");return}let p=J("Retrieving components from registry... "),{components:E,dependencies:w,devDependencies:y}=await G(i);if(p.stop(),await Promise.all(E.map(a=>L(a,t,{replace:!0}))),w.length>0||y.length>0){let a=J("Installing dependencies...").start();await C({dependencies:w,devDependencies:y}),a.succeed("Completed dependency installation")}}catch(t){l.error(t.message)}}import{Command as ye}from"commander";import K from"prompts";import{z as u}from"zod";import h from"fs/promises";import T from"path";import Q from"chalk";var F=`import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
`;import ve from"ora";import ue from"fs/promises";import R from"path";function $(e){return e.replace(/[\n\r\t\s]+/g,"")}import V from"chalk";var f=class{filePath;contentRequiredToExist;errorMessage;constructor(t,s,n){this.errorMessage=n,this.contentRequiredToExist=s,this.filePath=t}async check(){if(!await m(this.filePath))return this.errorMessage;let t=await ue.readFile(this.filePath,"utf-8");return $(t).includes($(this.contentRequiredToExist))||this.errorMessage}},M=class{packageName;installedPackages;errorMessage;constructor(t,s,n){this.packageName=t,this.installedPackages=s,this.errorMessage=n}async check(){return this.installedPackages.includes(this.packageName)||this.errorMessage}},d=class{requirements;buildTool;constructor(t){this.buildTool=t,this.requirements=[]}addRequirement(t){return this.requirements.push(t),this}async run(){return await Promise.all(this.requirements.map(s=>s.check()))}},he=await x(),S=process.cwd(),we={vite:new d("vite").addRequirement(new M("tailwindcss",he,"Tailwind CSS is not installed")).addRequirement(new f(R.resolve(S,"./vite.config.ts"),'"@": path.resolve(__dirname, "./src")',"Missing path resolver in `vite.config.ts`")).addRequirement(new f(R.resolve(S,"./tsconfig.app.json"),`"baseUrl": ".",
         "paths": {
           "@/*": ["./src/*"]
         }`,"Missing 'path' and 'baseURL' config is `tsconfig.app.json`")).addRequirement(new f(R.resolve(S,"./tsconfig.json"),`"baseUrl": ".",
         "paths": {
           "@/*": ["./src/*"]
         }`,"Missing 'path' and 'baseURL' config is `tsconfig.json`")),cra:new d("cra"),next:new d("next")};async function H(e){if(!await m(R.resolve(S,"./vite.config.ts")))return console.log(V.red("[ERROR]"),"Invalid project type, layers only supports typescript projects"),!1;let t=await we[e].run();return t.filter(n=>n!==!0).length>0?(t.forEach(n=>{console.log(V.red("[ERROR]"),n)}),!1):!0}var ke="/src/components/ui",xe="/src/utils",Ce="lib",X=new ye().name("init").description("intialize your project to accept layer components").action(Re),Pe=u.object({componentPath:u.string(),utilsPath:u.string(),utilsName:u.string(),buildTool:u.enum(["vite","cra","next"])});async function Re(){try{let e=await K([{type:"text",name:"componentPath",message:"Component install path?",initial:ke},{type:"text",message:"Utils file install path?",name:"utilsPath",initial:xe},{type:"text",message:"Utils file name?",name:"utilsName",initial:Ce},{type:"select",message:"Which build tool are you using?",name:"buildTool",initial:0,choices:[{title:"Vite",value:"vite"}]}]),t=Pe.parse(e),s=process.cwd(),n={path:{components:t.componentPath,utils:`${t.utilsPath}/${t.utilsName}`},using:t.buildTool},o=JSON.stringify(n,null,"	");if(await h.writeFile(T.resolve(s,"./components.json"),o),!await H(n.using)){l.info("Terminating operation, please follow the installation guide before running the init command again: https://github.com/Specticall/layers-ui");return}let i=T.resolve(s,`.${n.path.components}`);await m(i)||h.mkdir(i,{recursive:!0});let p=T.resolve(s,`.${n.path.utils}.ts`),E=T.resolve(s,`.${t.utilsPath}`);if(await m(p)){let{proceed:y}=await K({name:"proceed",type:"toggle",message:`The file named ${Q.yellow(t.utilsName+".tsx")} at ${Q.yellow(t.utilsPath)} already exists, would like to replace it?`,initial:!0,active:"yes",inactive:"no"});y&&await h.writeFile(p,F)}else h.mkdir(E,{recursive:!0}),await h.writeFile(p,F);let w=ve("Installing packages").start();await C({devDependencies:["tailwind-merge","clsx"],dependencies:[]}),w.stop(),l.success("Successfuly initialized project.")}catch(e){l.error(e.message)}}import{config as Te}from"dotenv";Te({path:"./.env"});async function Ee(){try{let e=new Se().name("layers-ui").description("Adds pre-made components to projects").version("1.0.0");e.addCommand(Y).addCommand(X),e.parse(process.argv)}catch(e){console.log(e.message)}}async function be(){}process.argv[2]==="test"?be():Ee();
//# sourceMappingURL=index.js.map