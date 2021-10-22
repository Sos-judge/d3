export 
在创建JavaScript模块时，export 语句用于从模块中导出实时绑定的函数、对象或原始值，以便其他程序可以通过 import 语句使用它们。

注意：1在HTML 中需要包含 type="module" 的 <script> 元素这样的脚本，以便它被识别为模块并正确处理.
      2必须通过 HTTP 服务器运行

有两种不同的导出方式，命名导出和默认导出。
      
      
命名导出（每个模块包含任意数量）
  导出事先定义的特性export { myFunction，myVariable };
  导出单个特性（可以导出var，let，const,function,class）
  export let myVariable = Math.sqrt(2);
  export function myFunction() { ... };
  在导出多个值时，命名导出非常有用。在导入期间，必须使用相应对象的相同名称。
  例如nameexport/test1


默认导出（每个模块包含一个）
  导出事先定义的特性作为默认值export { myFunction as default };
  例如nameexport/my-module2.js
  导出单个特性作为默认值export default function () { ... }export default class { .. };
  例如nameexport/my-module.js
  如果我们要导出一个值或得到模块中的返回值，就可以使用默认导出：
  可以使用任何名称导入默认导出，例如：defaultexport/test2

模块重定向
将多个模块聚合, 如/reexport
