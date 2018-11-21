import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc: true});
};

const tableData = [];

//const parse = (exp) => {
function parse(exp){
    for(var key in exp){
        if(typeof exp[key] == 'object'){
            parse(exp[key]);
        }
        else if(key == 'type' && parseByType.hasOwnProperty(exp[key])){
            parseByType[exp[key]](exp);
        }
    }
    //parseByType[exp['type']](exp);
}

const parseByType ={
    'FunctionDeclaration': parseFunction,
    'VariableDeclaration': parseVarDec,
    //'ExpressionStatement': parseExp,
    'AssignmentExpression': parseAssignExp,
    'UpdateExpression': parseUpdateExp,
    'WhileStatement': parseWhile,
    'ForStatement': parseFor,
    'IfStatement': parseIf,
    'ReturnStatement': parseReturn
};

function parseFunction(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    arr.push('function declaration');
    arr.push(exp['id']['name']);
    arr.push('');
    arr.push('');
    tableData.push(arr);
    var i;
    var params = exp['params'];
    for(i=0 ; i < params.length; i++){
        arr = [];
        arr.push(params[i]['loc']['start']['line']);
        arr.push('variable declaration');
        arr.push(params[i]['name']);
        arr.push('');
        arr.push('');
        tableData.push(arr);
    }
}

function parseVarDec(exp){
    var i;
    var declarations = exp['declarations'];
    for(i=0 ; i < declarations.length; i++){
        var arr = [];
        arr.push(declarations[i]['id']['loc']['start']['line']);
        arr.push('variable declaration');
        arr.push(declarations[i]['id']['name']);
        arr.push('');
        arr.push('null');
        tableData.push(arr);
    }
}

/*function parseExp(){

}*/

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

function createHTMLTable(arr){
    var result = '<thead>';
    result += '<tr>';
    result += '<th>' + 'Line' + '</th>';
    result += '<th>' + 'Type' + '</th>';
    result += '<th>' + 'Name' + '</th>';
    result += '<th>' + 'Condition' + '</th>';
    result += '<th>' + 'Value' + '</th>';
    result += '</tr>' + '</thead>';
    for(var i=0; i<arr.length; i++) {
        result += '<tr>';
        for(var j=0; j<arr[i].length; j++){
            result += '<td>' + arr[i][j]+'</td>';
        }
        result += '</tr>';
    }
    return result;
}

export {parseCode};
export {parse};
export {tableData};
export {createHTMLTable};

