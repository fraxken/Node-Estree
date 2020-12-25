// Import ESTree Specification
import * as es5 from "./es5";
import * as es2015 from "./es2015";
import * as es2017 from "./es2017";
import * as es2020 from "./es2020";

export const ESTree = { ...es5, ...es2015, ...es2017, ...es2020 };
