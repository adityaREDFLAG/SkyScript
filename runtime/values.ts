import Environment from "./environment.ts";
import { Statement } from "../frontend/ast.ts";
export type ValueType =
	| "null"
	| "number"
	| "boolean"
	| "string"
	| "array"
	| "object"
	| "native-fn"
	| "function"
	| "while"
	| "command";

// deno-lint-ignore no-empty-interface
export interface RuntimeValue {}

export interface Runtime extends RuntimeValue {
	type: ValueType;
}

export interface NullValue extends Runtime {
	type: "null";
	value: null;
}

export function makeNull() {
	return { type: "null", value: null } as NullValue;
}

export interface BooleanValue extends Runtime {
	type: "boolean";
	value: boolean;
}

export function MK_BOOL(b = true) {
	return { type: "boolean", value: b } as BooleanValue;
}

export interface NumberValue extends Runtime {
	type: "number";
	value: number;
}

export function MK_NUMBER(n = 0) {
	return { type: "number", value: n } as NumberValue;
}
export interface ObjectValue extends Runtime {
	type: "object";
	properties: Map<string, Runtime>;
}

export interface StringValue extends Runtime {
    type: 'string'
    value: string
}

export function MK_STR(str: string){
	return { type: "string", value: str } as StringValue;
}

export type FunctionCall = (args: Runtime[], env: Environment) => Runtime | StringValue;

export interface NativeFnValue extends Runtime {
	type: "native-fn";
	call: FunctionCall;
}
export function MK_NATIVE_FN(call: FunctionCall) {
	return { type: "native-fn", call } as NativeFnValue;
}

export interface FunctionValue extends Runtime {
	type: "function";
	name: string;
	parameters: string[];
	declarationEnv: Environment;
	body: Statement[];
}

export interface DiscordBotCommand extends Runtime {
	type: "command";
	name: string;
	command: FunctionValue;
}

export interface ArrayValue extends Runtime {
	type: "array";
	elements: Runtime[];
}