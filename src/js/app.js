import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parse} from './code-analyzer';
import {tableData} from './code-analyzer';
import {createHTMLTable} from './code-analyzer';

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
