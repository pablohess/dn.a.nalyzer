/******************************************************************************* 
 * Copyright (c) 2011 Pablo Hess. All rights reserved.
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/

function changeTitle(from, to, length) {
    $("#"+SEARCHRESULT_FORM).dialog('option', 'title', 'Search Result:&nbsp;&nbsp;&nbsp;from ' + from + ' to ' + to + ', length: ' + length);
}

function prepareSearchContentPrevious(textarea, input, start) {
    if (input.length > 0) {
        var part1 = textarea.substring(0,start);
        var part2 = textarea.substring(start, textarea.length);
        
        if (part1.lastIndexOf(input) != -1) {
            start = part1.lastIndexOf(input);
        } else {
            start = textarea.lastIndexOf(input);
        }
        
        part1 = textarea.substring(0,start);
        part2 = textarea.substring(start, textarea.length);
        part2 = part2.replace(input, "<span class=\"selection\">" + input + "</span>");
        document.getElementById(SEARCHRESULT_CONTENT).innerHTML = formatContent(part1 + part2, 5, 10, 50);
        
        changeTitle(start + 1, start + input.length, input.length);
    } else {
        document.getElementById(SEARCHRESULT_CONTENT).innerHTML = formatContent(textarea, 5, 10, 50);
    }
    
    document.getElementById(SEARCHRESULT_NUMBERS).innerHTML = createRowNumbers(textarea.length, 50);
    return textarea.indexOf(input, start);
}

function prepareSearchContentNext(textarea, input, start) {
    if (input.length > 0) {
        if (textarea.indexOf(input, start) == -1) {
            start = 0;
        }
        var part1 = textarea.substring(0,start);
        var part2 = textarea.substring(start, textarea.length);
        var part2 = part2.replace(input, "<span class=\"selection\">" + input + "</span>");
        document.getElementById(SEARCHRESULT_CONTENT).innerHTML = formatContent(part1 + part2, 5, 10, 50);
        
        changeTitle(textarea.indexOf(input, start) + 1, textarea.indexOf(input, start) + input.length, input.length);
    } else {
        document.getElementById(SEARCHRESULT_CONTENT).innerHTML = formatContent(textarea, 5, 10, 50);
    }
    
    document.getElementById(SEARCHRESULT_NUMBERS).innerHTML = createRowNumbers(textarea.length, 50);
    return textarea.indexOf(input, start);
}

function inverseAT(at) {
    at = at.replace(/t/g,"x"); // T --> X
    at = at.replace(/a/g,"t"); // A --> T
    at = at.replace(/x/g,"a"); // X --> A
    return at;
}

function inverseGC(gc) {
    gc = gc.replace(/c/g,"x"); // C --> X
    gc = gc.replace(/g/g,"c"); // G --> C
    gc = gc.replace(/x/g,"g"); // X --> G
    return gc;
}

function inverseATGC(atgc) {
    return inverseGC(inverseAT(atgc));
}

function reverse(s){
    return s.split("").reverse().join("");
}

function createRowNumbers(length, perLine) {
    rowNumbers = "0<br>";
    for(var rows = 0; perLine < length; length -= perLine) {
        rows++;
        rowNumbers += (rows * perLine) + "<br>";
    }
    return rowNumbers;
}

function formatContent(str, space, block, newLine) {
    var ret = "";
    var array = str.split("");
    var htmlTag = false;
    var count = 0;
    var index = 0;
    for (;index < str.length;++index) {
        if (!htmlTag) {
            if (count > 0) {
                if (count % newLine == 0) {
                    ret += "<br>";
                } else if (count % block == 0) {
                    ret += "&nbsp;&nbsp;&nbsp;";
                } else if (count % space == 0) {
                    ret += "&nbsp;";
                }
            }
            
            if (array[index] == "<") {
                htmlTag = true;
                for (;array[index] != ">";++index) {
                    ret += array[index];
                }
                ret += array[index];
                ++index;
            }
        } else {
            if (array[index] == "<") {
                htmlTag = false;
                for (;array[index] != ">";++index) {
                    ret += array[index];
                }
                ret += array[index];
                ++index;
            }
            
            if (count > 0) {
                if (count % newLine == 0) {
                    ret += "<br>";
                } else if (count % block == 0) {
                    ret += "&nbsp;&nbsp;&nbsp;";
                } else if (count % space == 0) {
                    ret += "&nbsp;";
                }
            }
        }
	
        ++count;
        if (array[index] != null) {
            ret += array[index];
        }
    }
    return ret;
}

function jumpOverHtmlTag() {
    
}

function getValue(element) {
    return document.getElementById(element).value;
}

function setValue(element, value) {
    document.getElementById(element).value = value;
}

// RNA
function rnaToDna(rna) {
    return rna.replace(/u/g,"t");
}

function rnaToDnaComp(rna) {
    rna = rna.replace(/a/g,"t"); // A --> T
    rna = rna.replace(/u/g,"a"); // U --> A
    return reverse(inverseGC(rna));
}

function filterPasteOnRna() {
    setValue(TEXTAREA_RNA, replaceNotRnaCharacters(getValue(TEXTAREA_RNA).toLowerCase()));
    setValue(TEXTAREA_DNA, rnaToDna(getValue(TEXTAREA_RNA)));
    setValue(TEXTAREA_DNA_COMP, rnaToDnaComp(getValue(TEXTAREA_RNA)));
}

function filterPasteOnRnaSearch() {
    setValue(INPUT_RNA, replaceNotRnaCharacters(getValue(INPUT_RNA).toLowerCase()));
}

function replaceNotRnaCharacters(s) {
    return s.replace(/[^augcnyr]/g,"");
}

// DNA
function dnaToRna(dna) {
    return dna.replace(/t/g,"u");
}

function dnaToDnaComp(dna) {
    return reverse(inverseATGC(dna));
}

function filterPasteOnDna() {
    setValue(TEXTAREA_DNA, replaceNotDnaCharacters(getValue(TEXTAREA_DNA).toLowerCase()));
    setValue(TEXTAREA_RNA, dnaToRna(getValue(TEXTAREA_DNA)));
    setValue(TEXTAREA_DNA_COMP, dnaToDnaComp(getValue(TEXTAREA_DNA)));
}

function filterPasteOnDnaSearch() {
    setValue(INPUT_DNA, replaceNotDnaCharacters(getValue(INPUT_DNA).toLowerCase()));
}

function replaceNotDnaCharacters(s) {
    return s.replace(/[^atgcnyr]/g,"");
}

// DNA complementary
function dnaCompToDna(dnaComp) {
    return reverse(inverseATGC(dnaComp));
}

function dnaCompToRna(dnaComp) {
    dnaComp = dnaComp.replace(/a/g,"u"); // A --> U
    dnaComp = dnaComp.replace(/t/g,"a"); // T --> A
    return reverse(inverseGC(dnaComp));
}

function filterPasteOnDnaComp() {
    setValue(TEXTAREA_DNA_COMP, replaceNotDnaCompCharacters(getValue(TEXTAREA_DNA_COMP).toLowerCase()));
    setValue(TEXTAREA_RNA, dnaCompToRna(getValue(TEXTAREA_DNA_COMP)));
    setValue(TEXTAREA_DNA, dnaCompToDna(getValue(TEXTAREA_DNA_COMP)));
}

function filterPasteOnDnaCompSearch() {
    setValue(INPUT_DNA_COMP, replaceNotDnaCharacters(getValue(INPUT_DNA_COMP).toLowerCase()));
}

function replaceNotDnaCompCharacters(s) {
    return replaceNotDnaCharacters(s);
}

function pasteExample(example) {
    setValue(TEXTAREA_DNA, example);
    filterPasteOnDna();
    $("#"+TABS).tabs('select', 0);
}