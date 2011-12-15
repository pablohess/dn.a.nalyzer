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

var KEY_CTRL = 17;
var KEY_APPLE_LEFT = 91;
var KEY_APPLE_RIGHT = 93;
var KEY_SHIFT = 16;
var KEY_BACKSPACE = 8;
var KEY_DELETE = 46;
var KEY_PAGE_UP = 33;
var KEY_PAGE_DOWN = 34;
var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;

var KEY_G = 71;
var KEY_A = 65;
var KEY_T = 84;
var KEY_C = 67;
var KEY_U = 85;

var KEY_N = 78;
var KEY_Y = 89;
var KEY_R = 82;

var KEY_V = 86;
var KEY_X = 88;

var ctrlDown = false;
var appleDown = false;

function isCtrl(key) {
    return key == KEY_CTRL;
}

function isApple(key) {
    return key == KEY_APPLE_LEFT || key == KEY_APPLE_RIGHT;
}

function isDeleteAction(key) {
    return key == KEY_DELETE || key == KEY_BACKSPACE;
}

function isNavigationKey(key) {
    return key == KEY_PAGE_UP || key == KEY_PAGE_DOWN || (key <= KEY_DOWN_ARROW && key >= KEY_LEFT_ARROW);
}

function isCopyPasteKey(key) {
    return (ctrlDown || appleDown) && (key == KEY_C || key == KEY_V || key == KEY_X);
}

function keyAllowed(key) {
    return isDeleteAction(key) || isNavigationKey(key) || isCopyPasteKey(key) || key == KEY_SHIFT;
}

function isSpecialCharacter(key) {
    return key == KEY_N || key == KEY_Y || key == KEY_R;
}

function isDna(key) {
    return isSpecialCharacter(key) || key == KEY_C || key == KEY_G || key == KEY_A || key == KEY_T;
}

function isRna(key) {
    return isSpecialCharacter(key) || key == KEY_A || key == KEY_U || key == KEY_G || key == KEY_C;
}

function isDnaComp(key) {
    return isDna(key);
}