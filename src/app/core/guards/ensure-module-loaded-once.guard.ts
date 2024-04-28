// The core module should only be imported at the root level
// --
// The following code was adapted from the Angular style guide and this article:
// https://medium.com/@joao.aguas/angular-core-and-shared-modules-efe072bc9645
export class EnsureModuleLoadedOnceGuard {
    constructor(targetModule: any) {
       if (targetModule) {
          throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
       }
    }
 }
