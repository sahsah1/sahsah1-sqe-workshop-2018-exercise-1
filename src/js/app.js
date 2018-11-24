import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parse} from './code-analyzer';
import {tableData} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        tableData.length = 0;
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        parse(parsedCode['body'][0]);
        var table = document.getElementById('myTable');
        table.innerHTML = createHTMLTable(tableData);
        //$('#parsedCode').val(JSON.stringify(parsedCode['body'][0], null, 2));
    });
});

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
