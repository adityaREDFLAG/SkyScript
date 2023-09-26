import { execSync } from "https://deno.land/std@0.177.1/node/child_process.ts";
import Environment from "../../../../environment.ts";
import { Runtime,NumberValue,makeNull } from "../../../../values.ts";

export default function(args: Runtime[], _scope: Environment){
    const value = (args[0] as NumberValue).value;
    execSync(`sleep ${value}`, {});
    return makeNull();
}