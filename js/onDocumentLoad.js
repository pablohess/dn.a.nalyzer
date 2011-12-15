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

var index = 0;

$(function() {
        $(document).keydown(function(event) {
            if (isCtrl(event.keyCode)) {
                ctrlDown = true;
            }
            if (isApple(event.keyCode)) {
                appleDown = true;
            }
        });
        $(document).keyup(function(event) {
            if (isCtrl(event.keyCode)) {
                ctrlDown = false;
            }
            if (isApple(event.keyCode)) {
                appleDown = false;
            }
        });

        $("#"+TABS).tabs({ cookie: { expires: 7 }});
        
        // DNA
        $("#"+TEXTAREA_DNA).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isDna(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+TEXTAREA_DNA).keyup(function(event) {
            if (isDna(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(TEXTAREA_DNA, getValue(TEXTAREA_DNA).toLowerCase());
                setValue(TEXTAREA_RNA, dnaToRna(getValue(TEXTAREA_DNA)));
                setValue(TEXTAREA_DNA_COMP, dnaToDnaComp(getValue(TEXTAREA_DNA)));
            }
        });
        $("#"+TEXTAREA_DNA).bind('paste', function(event) {
            setTimeout('filterPasteOnDna()', TIMEOUT_MILLISECONDS);
        });
        $("#"+TEXTAREA_DNA).bind('cut', function(event) {
            setTimeout('filterPasteOnDna()', TIMEOUT_MILLISECONDS);
        });
        
        $("#"+INPUT_DNA).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isDna(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+INPUT_DNA).keyup(function(event) {
            if (isDna(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(INPUT_DNA, getValue(INPUT_DNA).toLowerCase());
            }
        });
        $("#"+INPUT_DNA).bind('paste', function(event) {
            setTimeout('filterPasteOnDnaSearch()', TIMEOUT_MILLISECONDS);
        });
        $("#"+INPUT_DNA).bind('cut', function(event) {
            setTimeout('filterPasteOnDnaSearch()', TIMEOUT_MILLISECONDS);
        });
        
        // DNA complementary
        $("#"+TEXTAREA_DNA_COMP).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isDnaComp(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+TEXTAREA_DNA_COMP).keyup(function(event) {
            if (isDnaComp(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(TEXTAREA_DNA_COMP, getValue(TEXTAREA_DNA_COMP).toLowerCase());
                setValue(TEXTAREA_RNA, dnaCompToRna(getValue(TEXTAREA_DNA_COMP)));
                setValue(TEXTAREA_DNA, dnaCompToDna(getValue(TEXTAREA_DNA_COMP)));
            }
        });
        $("#"+TEXTAREA_DNA_COMP).bind('paste', function(event) {
            setTimeout('filterPasteOnDnaComp()', TIMEOUT_MILLISECONDS);
        });
        $("#"+TEXTAREA_DNA_COMP).bind('cut', function(event) {
            setTimeout('filterPasteOnDnaComp()', TIMEOUT_MILLISECONDS);
        });
        
        $("#"+INPUT_DNA_COMP).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isDnaComp(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+INPUT_DNA_COMP).keyup(function(event) {
            if (isDnaComp(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(INPUT_DNA_COMP, getValue(INPUT_DNA_COMP).toLowerCase());
            }
        });
        $("#"+INPUT_DNA_COMP).bind('paste', function(event) {
            setTimeout('filterPasteOnDnaCompSearch()', TIMEOUT_MILLISECONDS);
        });
        $("#"+INPUT_DNA_COMP).bind('cut', function(event) {
            setTimeout('filterPasteOnDnaCompSearch()', TIMEOUT_MILLISECONDS);
        });
        
        // RNA
        $("#"+TEXTAREA_RNA).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isRna(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+TEXTAREA_RNA).keyup(function(event) {
            if (isRna(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(TEXTAREA_RNA, getValue(TEXTAREA_RNA).toLowerCase());
                setValue(TEXTAREA_DNA, rnaToDna(getValue(TEXTAREA_RNA)));
                setValue(TEXTAREA_DNA_COMP, rnaToDnaComp(getValue(TEXTAREA_RNA)));
            }
        });
        $("#"+TEXTAREA_RNA).bind('paste', function(event) {
            setTimeout('filterPasteOnRna()', TIMEOUT_MILLISECONDS);
        });
        $("#"+TEXTAREA_RNA).bind('cut', function(event) {
            setTimeout('filterPasteOnRna()', TIMEOUT_MILLISECONDS);
        });
        
        $("#"+INPUT_RNA).keydown(function(event) {
            if (!keyAllowed(event.keyCode)) {
                if (!isRna(event.keyCode)) {
                    event.preventDefault(); 
                }
            }
        });
        $("#"+INPUT_RNA).keyup(function(event) {
            if (isRna(event.keyCode) || isDeleteAction(event.keyCode)) {
                setValue(INPUT_RNA, getValue(INPUT_RNA).toLowerCase());
            }
        });
        $("#"+INPUT_RNA).bind('paste', function(event) {
            setTimeout('filterPasteOnRnaSearch()', TIMEOUT_MILLISECONDS);
        });
        $("#"+INPUT_RNA).bind('cut', function(event) {
            setTimeout('filterPasteOnRnaSearch()', TIMEOUT_MILLISECONDS);
        });
        
        // Buttons
        $( "input: submit, button", ".container" ).button();
        $("#"+BUTTON_SEARCH_DNA).click(function() {
            index = prepareSearchContentNext(getValue(TEXTAREA_DNA), getValue(INPUT_DNA), 0);
            $("#"+SEARCHRESULT_FORM).dialog("open");
        });
        $("#"+BUTTON_SEARCH_DNA_COMP).click(function() {
            index = prepareSearchContentNext(getValue(TEXTAREA_DNA_COMP), getValue(INPUT_DNA_COMP), 0);
            $("#"+SEARCHRESULT_FORM).dialog("open");
        });
        $("#"+BUTTON_SEARCH_RNA).click(function() {
            index = prepareSearchContentNext(getValue(TEXTAREA_RNA), getValue(INPUT_RNA), 0);
            $("#"+SEARCHRESULT_FORM).dialog("open");
        });
        $("#"+BUTTON_CCND1).click(function() {
            pasteExample(CCND1Chromosome11);
        });
        $("#"+BUTTON_CCND2).click(function() {
            pasteExample(CCND2Chromosome12);
        });
        
        $("#"+SEARCHRESULT_FORM).dialog({
            autoOpen: false,
            height: 700,
            width: 840,
            modal: true,
            open: function() {
                $(this).closest('.ui-dialog').find('.ui-dialog-buttonpane button:eq(2)').focus(); 
            },
            buttons: {
                Cancel: function() {
                    $(this).dialog("close");
                },
                Previous: function() {
                    index = prepareSearchContentPrevious(getValue(TEXTAREA_DNA), getValue(INPUT_DNA), ++index);
                },
                Next: function() {
                    index = prepareSearchContentNext(getValue(TEXTAREA_DNA), getValue(INPUT_DNA), ++index);
                }
            },
            close: function() {
                allFields.val("").removeClass("ui-state-error");
            }
        });
});