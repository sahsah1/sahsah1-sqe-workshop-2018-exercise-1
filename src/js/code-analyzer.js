import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc: true});
};

const tableData = [];
var isElseIf = false;

function parse(exp){
    for(var key in exp){
        if(typeof exp[key] == 'object'){
            checkAlternate(exp, key);
            parse(exp[key]);
        }
        else if(key == 'type' && parseByType.hasOwnProperty(exp[key])){
            parseByType[exp[key]](exp);
        }
    }
}

const parseByType ={
    'FunctionDeclaration': parseFunction,
    'VariableDeclaration': parseVarDec,
    'AssignmentExpression': parseAssignExp,
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
        var val = declarations[i]['init'];
        if(val != null){
            arr.push(escodegen.generate(val));
        }
        else{
            arr.push(val);
        }
        tableData.push(arr);
    }
}

function parseAssignExp(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    arr.push('assignment expression');
    arr.push(exp['left']['name']);
    arr.push('');
    arr.push(escodegen.generate(exp['right']));
    tableData.push(arr);
}

function parseWhile(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    arr.push('while statement');
    arr.push('');
    arr.push(escodegen.generate(exp['test']));
    arr.push('');
    tableData.push(arr);
}

function parseFor(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    arr.push('for statement');
    arr.push('');
    arr.push(escodegen.generate(exp['test']));
    arr.push('');
    tableData.push(arr);
}

function parseIf(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    if(isElseIf){
        arr.push('else if statement');
        isElseIf = false;
    }
    else {
        arr.push('if statement');
    }
    arr.push('');
    arr.push(escodegen.generate(exp['test']));
    arr.push('');
    tableData.push(arr);
}

function parseReturn(exp){
    var arr = [];
    arr.push(exp['loc']['start']['line']);
    arr.push('return statement');
    arr.push('');
    arr.push('');
    arr.push(escodegen.generate(exp['argument']));
    tableData.push(arr);
}

function checkAlternate(exp, key) {
    if(key == 'alternate' && exp[key]['type'] == 'IfStatement'){
        isElseIf = true;
    }
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

