import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc: true});
};

function parse(exp){
    return parseByType[exp.type](exp);
}

const parseByType ={
    'FunctionDeclaration': parseFunction,
    'VariableDeclaration': parseVarDec,
    'ExpressionStatement': parseExp,
    'AssignmentExpression': parseAssignExp,
    'UpdateExpression': parseUpdateExp,
    'WhileStatement': parseWhile,
    'ForStatement': parseFor,
    'IfStatement': parseIf,
    'ReturnStatement': parseReturn
};

function parseFunction(){

}

function parseVarDec(){

}

function parseExp(){

}

function parseAssignExp(){

}

function parseUpdateExp(){

}

function parseWhile(){

}

function parseFor(){

}

function parseIf(){

}

function parseReturn(){

}

export {parseCode};
