import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {parse} from '../src/js/code-analyzer';
import {tableData} from '../src/js/code-analyzer';
import * as analyzer from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });

    /*it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
        );
    });*/
});

describe('The function parser', () => {
    it('is parsing a function declaration correctly', () => {
        analyzer.parse(parseCode('function test(){}'));
        assert.deepEqual(tableData[0], [1,'function declaration','test','','']);
        tableData.length = 0;
    });
});

describe('The function parser', () => {
    it('is parsing a function declaration with parameters correctly', () => {
        analyzer.parse(parseCode('function test(X){}'));
        assert.deepEqual(tableData[0], [1,'function declaration','test','','']);
        assert.deepEqual(tableData[1], [1,'variable declaration','X','','']);
        tableData.length = 0;
    });
});

describe('The variable declaration parser', () => {
    it('is parsing a variable declaration correctly', () => {
        parse(parseCode('let low;'));
        assert.deepEqual(tableData[0], [1,'variable declaration','low','',null]);
        tableData.length = 0;
    });
    it('is parsing a variable declaration with assignment correctly', () => {
        parse(parseCode('let low = 0;'));
        assert.deepEqual(tableData[0], [1,'variable declaration','low','','0']);
        tableData.length = 0;
    });
});

describe('The assignment expression parser', () => {
    it('is parsing an assignment expression correctly', () => {
        parse(parseCode('low = 0;'));
        assert.deepEqual(tableData[0], [1,'assignment expression','low','',0]);
        tableData.length = 0;
    });
});

describe('The while statement parser', () => {
    it('is parsing a while statement correctly', () => {
        parse(parseCode('while (low <= high) {}'));
        assert.deepEqual(tableData[0], [1,'while statement','','low <= high','']);
        tableData.length = 0;
    });
});

describe('The for statement parser', () => {
    it('is parsing a for statement correctly', () => {
        parse(parseCode('for (i=0;i<=5;i=i++) {}'));
        assert.deepEqual(tableData[0], [1,'for statement','','i <= 5','']);
        assert.deepEqual(tableData[1], [1,'assignment expression','i','',0]);
        assert.deepEqual(tableData[2], [1,'assignment expression','i','','i++']);
        tableData.length = 0;
    });
});

describe('The if statement parser', () => {
    it('is parsing an if statement correctly', () => {
        parse(parseCode('if (X < V[mid]) {}'));
        assert.deepEqual(tableData[0], [1,'if statement','','X < V[mid]','']);
        tableData.length = 0;
    });
});

describe('The else if statement parser', () => {
    it('is parsing an else if statement correctly', () => {
        parse(parseCode('if (X < V[mid])\n' +
            '            high = mid - 1;\n' +
            '        else if (X > V[mid])\n' +
            '            low = mid + 1;'));
        assert.deepEqual(tableData[2], [3,'else if statement','','X > V[mid]','']);
        tableData.length = 0;
    });
});

describe('The return statement parser', () => {
    it('is parsing a return statement correctly', () => {
        parse(parseCode('function test(){\n' +
            '    return X;\n' +
            '}'));
        assert.deepEqual(tableData[1], [2,'return statement','','','X']);
        tableData.length = 0;
    });
});

describe('The parse statement parser', () => {
    it('is parsing a program correctly', () => {
        parse(parseCode('function test(){\n' +
            '    let x = 3;\n' +
            '    for(i=0;i<=5;i=i++){\n' +
            '        x = x+i;\n' +
            '    }\n' +
            '    return x;\n' +
            '}'));
        assert.deepEqual(tableData[0], [1,'function declaration','test','','']);
        assert.deepEqual(tableData[1], [2,'variable declaration','x','',3]);
        assert.deepEqual(tableData[2], [3,'for statement','','i <= 5','']);
        assert.deepEqual(tableData[3], [3,'assignment expression','i','',0]);
        assert.deepEqual(tableData[4], [3,'assignment expression','i','','i++']);
        assert.deepEqual(tableData[5], [4,'assignment expression','x','','x + i']);
        assert.deepEqual(tableData[6], [6,'return statement','','','x']);
        tableData.length = 0;
    });
});
