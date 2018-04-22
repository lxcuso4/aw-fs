
interface Fs {
    access(path: string, mode: number): Promise;
    writeFile(path: string, data: string|object, opt?: object): Promise;
    mkdir(path: string, mode?: number): Promise;
    readFile(path:string, opt?: string|object): Promise;
    existsSync(path:string): boolean;
    writeFileSync(path:string, data:string, opt?:string|object):boolean;
    readFileSync(path:string, opt?:string|object):any;
    rmdir(path:string): Promise;
    rename(oldPath:any,newPath:any): Promise;
    unlink(path:any):Promise;
    constants: {
        F_OK: number;
        W_OK: number;
        R_OK: number;
        X_OK: number;
    };
}
declare const fs:Fs;
export default fs;