import React from 'react';
import { useState } from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

// store variable notes in exercises
$('textarea').on("change keyup paste", function(){
    console.log("text area has changed 2", $(this).val(), $(this).prop("id"), window.location.href.at(-1));
    localStorage.setItem($(this).prop("id") + "_ex" + window.location.href.at(-1), $(this).val());
})

const selectors = {};
const annotables = []; // keys are the specific annotations
const tutorons = {
    "left": "The left CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements.",
    "top": "The top CSS property participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements.",
    "load": "Load data from the server and place the returned HTML into the matched elements.",
    "show()": "Display the matched elements.",
    "error": "Bind an event handler to the \"error\" JavaScript event.",
    "remove()": "Remove the set of matched elements from the DOM.",
    "append": "Insert content, specified by the parameter, to the end of each element in the set of matched elements.",
    "Math.floor()": "The static method always rounds down and returns the largest integer less than or equal to a given number.", // JS MDN site
    ".children()": "Returns a live HTMLCollection which contains all of the child elements of the element upon which it was called",
    ".not": "A.not(B) returns all A elements that do not have the class name B",
    "find": "Returns the first element in the provided array that satisfies the provided testing function.",
};

$(document).on("ready", function(){
    // store variable notes in exercises
    $('textarea').on("change keyup paste", function(){
        // console.log("text area has changed 2", $(this).val(), $(this).prop("id"), window.location.href.at(-1));
        // console.log("going to set", $(this).prop("id") + "_ex" + window.location.href.at(-1), "to", $(this).val());
        localStorage.setItem($(this).prop("id") + "_ex" + window.location.href.at(-1), $(this).val());
    });
});

function getPrevNotes() {
    var prev_notes = "";
    var prev_ex = parseInt(window.location.href.at(-1)) - 1;
    if (prev_ex > -1) {
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            if (k.includes("_ex" + prev_ex)) {
                console.log("prev ex notes: ", localStorage.getItem(k));
                prev_notes += k + ": " + localStorage.getItem(k) + " <br>";
            }
        }
    }
    return prev_notes;
}

function getTutoronifiedHTML(code) {
    code = code.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    for (const [key, value] of Object.entries(tutorons)) {
        var tutorons_html = "<span class='border-underline' title='" + value + "'>" + key + "</span>";
        code = code.replaceAll(key, tutorons_html);
    }
    return code;
}

function addNewlines(str, variable_name) {
    // this runs every time a DOM element is shown as a variable on the page, so we should update the selectors at this stage
    // we do it by classes for now
    let class_loc = str.indexOf('class="') + 'class="'.length;
    let end_class_loc = str.substring(class_loc).indexOf('"');
    let class_name = str.substring(class_loc, class_loc + end_class_loc);
    // console.log("in addNewLines class_name:", class_name);
    if (selectors[variable_name]) {
        if (!selectors[variable_name].includes(class_name)) {
            selectors[variable_name].push(class_name);
        }
    }
    else {
        selectors[variable_name] = [];
    }

    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 80) + '\n';
        str = str.substring(80);
    }
    let dotdotdot = "...";
    if (result.length < 150) 
        dotdotdot = " ";
    return result.substring(0,150) + dotdotdot;
}

function h2t(src) { // html to text
    return src.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); //.replace("&", " &amp; "); 
}

function splitByLastUnderscore(splittable) {
    var split_index = splittable.lastIndexOf("_");
    return splittable.substr(0, split_index);
}

function HAButton(props) {
    const [toggle, setToggle] = useState(true);
    const annotations_to_show_by_tag = [ 'dimage', 'tile', 'dremove' ];
    const noannotations = [ 'dmap', 'position', 'centre_last', 'centre', 'tilesize', 'name', 'e', 'scroll_delta', 'pos', 'container_size' ];
    
    function reAnnotate(){ // for reannotating when user behavior erases annotations
        let existing_annotations = document.getElementsByClassName("annotation");
        if (existing_annotations.length < 1) { // only reannotate if the annotations aren't already there
            for (var elem_to_annotate of annotables) {
                addAnnotation(elem_to_annotate);
            }
        }
    }

    function dollarifyVar(variable_from_exercise) {
        if (variable_from_exercise.substring(0,1) == 'd') // assumes variable can't start with a d
            return "$" + variable_from_exercise.substring(1);
        else
            return variable_from_exercise;
    }

    function addAnnotation(element) {
        // console.log("element", element, "props.id", props.id);
        let text_to_display = element.outerHTML; // .replaceAll("<", "&lt;").replaceAll(">", "&gt;") - not needed apparently
        var para = document.createElement("p");
        var variable_from_exercise = splitByLastUnderscore(props.id);
        variable_from_exercise = dollarifyVar(variable_from_exercise);
        var node = document.createTextNode(text_to_display);
        para.appendChild(node);
        para.style.top = element.style.top;
        para.style.left = element.style.left;
        para.style.margin = "20px";
        para.style.position = "absolute";
        para.classList.add("annotation");
        para.style.color = "gray";
        document.getElementsByClassName('map')[0].appendChild(para);
    }

    function addOrRemoveAnnotations(element) {
        if (toggle) {
            addAnnotation(element);
            // the annotation should also be retained upon user actions (mousemove / mousedown / mouseup / keyboard)
            annotables.push(element);
            $(document).on("mouseup keydown keyup", reAnnotate);
        }
        else {
            $(".annotation").remove();
            $(document).off("mouseup keydown keyup", reAnnotate);
        }
        // add element html at the corners of the html element
    }

    function markBorder(element) {
        // console.log("markBorder", element);
        if (element) {  
            if (toggle) {
                element.style.border = "5px solid black";
            }
            else {
                element.style.border = "0px solid black";
            }
        }
    }

    function annotateTag(tag) {
        // console.log("tag", tag);
        let tag_elems = document.getElementsByTagName(tag);
        // console.log("tag_elems", tag_elems);
        for (var tag_elem of tag_elems) {
            markBorder(tag_elem);
            addOrRemoveAnnotations(tag_elem);
        }
    }

    function annotate(variable, element) {
        // console.log("in annotate", variable, element, toggle);
        element = element[0];
        if (!element) return;
        if (annotations_to_show_by_tag.includes(variable)) {
            // console.log(variable, "in annotations_to_show_by_tag");
            let tag = element.tagName;
            annotateTag(tag);
            $("body").on("mouseup keydown keyup", function() {
                annotateTag(tag); // redo the annotation if in new territory
                if (!toggle) {
                    $("body").off();
                }
            });
        }
        else {   
            markBorder(element);
            addOrRemoveAnnotations(element);
        }
    }
    
    function highlightInCode(variable) {
        let codetoshow = document.getElementById("codetoshow");
        if (toggle) {
            let vartohighlight = dollarifyVar(variable);
            // console.log("vartohighlight: ", vartohighlight, "codetoshow", codetoshow);
            codetoshow.outerHTML = codetoshow.outerHTML.replaceAll(vartohighlight, "<mark>" + vartohighlight + "</mark>");
        }
        else {
            codetoshow.outerHTML = codetoshow.outerHTML.replaceAll("<mark>", "").replaceAll("</mark>", "");
        }
    }

    function handleClick() {
        // console.log("in handleClick", toggle, props.id);

        // remove all existing annotations to avoid confusion
        if (!toggle) {
            $(".annotation").remove(); 
        }
        
        let element_to_a_h = splitByLastUnderscore(props.id);
        if (!noannotations.includes(element_to_a_h)) {
            if (toggle)
                alert("Annotated and highlighted! Play around and check.");
            // console.log("element_to_a_h", element_to_a_h);
            // console.log("selectors[", element_to_a_h, "]", selectors[element_to_a_h]);
            for (var selector of selectors[element_to_a_h]) {
                let element_to_a_h_html = document.getElementsByClassName(selector);
                // console.log("selector", selector, "element_to_a_h_html", element_to_a_h_html);
                annotate(element_to_a_h, element_to_a_h_html);
            }
        }
        else {
            if (toggle)
                alert("Highlighted! Play around and check.");
        }
        highlightInCode(element_to_a_h);
        setToggle(!toggle);
    }

    function buttonText(t) {
        if (t) return "Annotate / Highlight";
        else return "Unannotate / Unhighlight";
    }
    
    return (
      <button onClick={handleClick}>
          {buttonText(toggle)}
      </button>
    );
}

export default class ExerciseAG8 extends React.Component {

    componentDidMount() {
        function eventPos(e) {
    if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];
    }
    return {
        pageX: e.pageX,
        pageY: e.pageY
    };
} // here is a comment

var Map = function ($container) {
    $container.css({
        "z-index": 1,
        overflow: "hidden",
        width: "740px",
        height: "694px",
        margin: "0px auto 0",
        background: "#fff",
        position: "relative"
    }); /** another comment */

    var $overlay = $container.children("img");
    $overlay.css({
        background: "transparent",
        position: "relative"
    });

    var sign = function (x) {
        return x > 0 ? +1 : x < 0 ? -1 : 0;
    };
    var pow = function (x, y) {
        return Math.pow(Math.abs(x), y) * sign(x);
    };
    var clamp = function (x, min, max) {
        return Math.max(Math.min(x, max), min);
    };

    var offset = $container.offset();

    var padding_top = 200;
    var size = [14, 48, 25, 33];
    var tilesize = 2048;

            // console.log('tilesize', tilesize);
            // exclude annotations
            if (tilesize && tilesize[0] && tilesize[0].outerHTML && tilesize[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${tilesize}`).includes("object") && tilesize[0]) {
                    $('#tilesize')[0].innerHTML = `${h2t(addNewlines(tilesize[0].outerHTML, 'tilesize'))}`;
                }
                else {
                    if (tilesize && tilesize.selector) {
                        $('#tilesize')[0].innerHTML = `${tilesize.selector} (we output the selector when length is 0)`;
                    }
                    else if (tilesize && tilesize.originalEvent) {
                        $('#tilesize')[0].innerHTML = `${tilesize.type}`;
                    }
                    else if (typeof(tilesize) == 'object') {
                        try {
                            $('#tilesize')[0].innerHTML = JSON.stringify(tilesize);
                        }
                        catch {
                            $('#tilesize')[0].innerHTML = `${tilesize}`;
                        }
                    }
                    else {
                        $('#tilesize')[0].innerHTML = `${tilesize}`;
                    }
                }
            }
        
    var visible = [];
    var container_size = [$container.width(), $container.height()];
    var scroll_delta = null;

    var $map = $container.children(".map");

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
                }
                else {
                    if ($map && $map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                    }
                    else if ($map && $map.originalEvent) {
                        $('#dmap')[0].innerHTML = `${$map.type}`;
                    }
                    else if (typeof($map) == 'object') {
                        try {
                            $('#dmap')[0].innerHTML = JSON.stringify($map);
                        }
                        catch {
                            $('#dmap')[0].innerHTML = `${$map}`;
                        }
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
            }
        

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
                }
                else {
                    if ($map && $map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                    }
                    else if ($map && $map.originalEvent) {
                        $('#dmap')[0].innerHTML = `${$map.type}`;
                    }
                    else if (typeof($map) == 'object') {
                        try {
                            $('#dmap')[0].innerHTML = JSON.stringify($map);
                        }
                        catch {
                            $('#dmap')[0].innerHTML = `${$map}`;
                        }
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
            }
        

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];

            // console.log('position', position);
            // exclude annotations
            if (position && position[0] && position[0].outerHTML && position[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `${h2t(addNewlines(position[0].outerHTML, 'position'))}`;
                }
                else {
                    if (position && position.selector) {
                        $('#position')[0].innerHTML = `${position.selector} (we output the selector when length is 0)`;
                    }
                    else if (position && position.originalEvent) {
                        $('#position')[0].innerHTML = `${position.type}`;
                    }
                    else if (typeof(position) == 'object') {
                        try {
                            $('#position')[0].innerHTML = JSON.stringify(position);
                        }
                        catch {
                            $('#position')[0].innerHTML = `${position}`;
                        }
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`;
                    }
                }
            }
        

    $map.find(".ground").css({
        top: size[0] * tilesize,
        height: size[2] * tilesize,
        position: "absolute",
        width: "100%",
        zIndex: -1,
        background: "#000"
    });

    var centre = [-1, 0];

            // console.log('centre', centre);
            // exclude annotations
            if (centre && centre[0] && centre[0].outerHTML && centre[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${centre}`).includes("object") && centre[0]) {
                    $('#centre')[0].innerHTML = `${h2t(addNewlines(centre[0].outerHTML, 'centre'))}`;
                }
                else {
                    if (centre && centre.selector) {
                        $('#centre')[0].innerHTML = `${centre.selector} (we output the selector when length is 0)`;
                    }
                    else if (centre && centre.originalEvent) {
                        $('#centre')[0].innerHTML = `${centre.type}`;
                    }
                    else if (typeof(centre) == 'object') {
                        try {
                            $('#centre')[0].innerHTML = JSON.stringify(centre);
                        }
                        catch {
                            $('#centre')[0].innerHTML = `${centre}`;
                        }
                    }
                    else {
                        $('#centre')[0].innerHTML = `${centre}`;
                    }
                }
            }
        

    var update = function () {
        $map.css({
            left: position[0],
            top: position[1]
        });

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
                }
                else {
                    if ($map && $map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                    }
                    else if ($map && $map.originalEvent) {
                        $('#dmap')[0].innerHTML = `${$map.type}`;
                    }
                    else if (typeof($map) == 'object') {
                        try {
                            $('#dmap')[0].innerHTML = JSON.stringify($map);
                        }
                        catch {
                            $('#dmap')[0].innerHTML = `${$map}`;
                        }
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
            }
        

        var centre_last = centre;

            // console.log('centre_last', centre_last);
            // exclude annotations
            if (centre_last && centre_last[0] && centre_last[0].outerHTML && centre_last[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${centre_last}`).includes("object") && centre_last[0]) {
                    $('#centre_last')[0].innerHTML = `${h2t(addNewlines(centre_last[0].outerHTML, 'centre_last'))}`;
                }
                else {
                    if (centre_last && centre_last.selector) {
                        $('#centre_last')[0].innerHTML = `${centre_last.selector} (we output the selector when length is 0)`;
                    }
                    else if (centre_last && centre_last.originalEvent) {
                        $('#centre_last')[0].innerHTML = `${centre_last.type}`;
                    }
                    else if (typeof(centre_last) == 'object') {
                        try {
                            $('#centre_last')[0].innerHTML = JSON.stringify(centre_last);
                        }
                        catch {
                            $('#centre_last')[0].innerHTML = `${centre_last}`;
                        }
                    }
                    else {
                        $('#centre_last')[0].innerHTML = `${centre_last}`;
                    }
                }
            }
        
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

            // console.log('centre', centre);
            // exclude annotations
            if (centre && centre[0] && centre[0].outerHTML && centre[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${centre}`).includes("object") && centre[0]) {
                    $('#centre')[0].innerHTML = `${h2t(addNewlines(centre[0].outerHTML, 'centre'))}`;
                }
                else {
                    if (centre && centre.selector) {
                        $('#centre')[0].innerHTML = `${centre.selector} (we output the selector when length is 0)`;
                    }
                    else if (centre && centre.originalEvent) {
                        $('#centre')[0].innerHTML = `${centre.type}`;
                    }
                    else if (typeof(centre) == 'object') {
                        try {
                            $('#centre')[0].innerHTML = JSON.stringify(centre);
                        }
                        catch {
                            $('#centre')[0].innerHTML = `${centre}`;
                        }
                    }
                    else {
                        $('#centre')[0].innerHTML = `${centre}`;
                    }
                }
            }
        

        var tile_name = function (x, y) {
            x -= size[3];
            y -= size[0];
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");


            // console.log('$remove', $remove);
            // exclude annotations
            if ($remove && $remove[0] && $remove[0].outerHTML && $remove[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
                }
                else {
                    if ($remove && $remove.selector) {
                        $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                    }
                    else if ($remove && $remove.originalEvent) {
                        $('#dremove')[0].innerHTML = `${$remove.type}`;
                    }
                    else if (typeof($remove) == 'object') {
                        try {
                            $('#dremove')[0].innerHTML = JSON.stringify($remove);
                        }
                        catch {
                            $('#dremove')[0].innerHTML = `${$remove}`;
                        }
                    }
                    else {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
            }
        
try { $('#name')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#tile')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dremove')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dimage')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }selectors['dremove'] = [];selectors['tile'] = [];selectors['dimage'] = [];selectors['dmap'] = [];
            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);

            // console.log('name', name);
            // exclude annotations
            if (name && name[0] && name[0].outerHTML && name[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${name}`).includes("object") && name[0]) {
                    $('#name')[0].innerHTML += ' <br> ' + `${h2t(addNewlines(name[0].outerHTML, 'name'))}`;
                }
                else {
                    if (name && name.selector) {
                        $('#name')[0].innerHTML += ' <br> ' + `${name.selector} (we output the selector when length is 0)`;
                    }
                    else if (name && name.originalEvent) {
                        $('#name')[0].innerHTML += ' <br> ' + `${name.type}`;
                    }
                    else if (typeof(name) == 'object') {
                        try {
                            $('#name')[0].innerHTML += ' <br> ' + JSON.stringify(name);
                        }
                        catch {
                            $('#name')[0].innerHTML += ' <br> ' + `${name}`;
                        }
                    }
                    else {
                        $('#name')[0].innerHTML += ' <br> ' + `${name}`;
                    }
                }
            }
        
                    var tile = $map.find(".tile" + name);

            // console.log('tile', tile);
            // exclude annotations
            if (tile && tile[0] && tile[0].outerHTML && tile[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${tile}`).includes("object") && tile[0]) {
                    $('#tile')[0].innerHTML += ' <br> ' + `${h2t(addNewlines(tile[0].outerHTML, 'tile'))}`;
                }
                else {
                    if (tile && tile.selector) {
                        $('#tile')[0].innerHTML += ' <br> ' + `${tile.selector} (we output the selector when length is 0)`;
                    }
                    else if (tile && tile.originalEvent) {
                        $('#tile')[0].innerHTML += ' <br> ' + `${tile.type}`;
                    }
                    else if (typeof(tile) == 'object') {
                        try {
                            $('#tile')[0].innerHTML += ' <br> ' + JSON.stringify(tile);
                        }
                        catch {
                            $('#tile')[0].innerHTML += ' <br> ' + `${tile}`;
                        }
                    }
                    else {
                        $('#tile')[0].innerHTML += ' <br> ' + `${tile}`;
                    }
                }
            }
        
                    if (tile.length) {
                        $remove = $remove.not(tile);

            // console.log('$remove', $remove);
            // exclude annotations
            if ($remove && $remove[0] && $remove[0].outerHTML && $remove[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
                }
                else {
                    if ($remove && $remove.selector) {
                        $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.selector} (we output the selector when length is 0)`;
                    }
                    else if ($remove && $remove.originalEvent) {
                        $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.type}`;
                    }
                    else if (typeof($remove) == 'object') {
                        try {
                            $('#dremove')[0].innerHTML += ' <br> ' + JSON.stringify($remove);
                        }
                        catch {
                            $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                        }
                    }
                    else {
                        $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                    }
                }
            }
        
                    } else {
                        var $image = $(
                            '<img class="tile' +
                                name +
                                '" src="http://imgs.xkcd.com/clickdrag/' +
                                name +
                                '.png" style="top:' +
                                (centre[1] + y) * tilesize +
                                "px;left:" +
                                (centre[0] + x) * tilesize +
                                'px; z-index: -1; position: absolute;;" style="display:none" />'
                        );

            // console.log('$image', $image);
            // exclude annotations
            if ($image && $image[0] && $image[0].outerHTML && $image[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$image}`).includes("object") && $image[0]) {
                    $('#dimage')[0].innerHTML += ' <br> ' + `${h2t(addNewlines($image[0].outerHTML, 'dimage'))}`;
                }
                else {
                    if ($image && $image.selector) {
                        $('#dimage')[0].innerHTML += ' <br> ' + `${$image.selector} (we output the selector when length is 0)`;
                    }
                    else if ($image && $image.originalEvent) {
                        $('#dimage')[0].innerHTML += ' <br> ' + `${$image.type}`;
                    }
                    else if (typeof($image) == 'object') {
                        try {
                            $('#dimage')[0].innerHTML += ' <br> ' + JSON.stringify($image);
                        }
                        catch {
                            $('#dimage')[0].innerHTML += ' <br> ' + `${$image}`;
                        }
                    }
                    else {
                        $('#dimage')[0].innerHTML += ' <br> ' + `${$image}`;
                    }
                }
            }
        
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
                }
                else {
                    if ($map && $map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                    }
                    else if ($map && $map.originalEvent) {
                        $('#dmap')[0].innerHTML = `${$map.type}`;
                    }
                    else if (typeof($map) == 'object') {
                        try {
                            $('#dmap')[0].innerHTML = JSON.stringify($map);
                        }
                        catch {
                            $('#dmap')[0].innerHTML = `${$map}`;
                        }
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
            }
        
                    }
                }
            }

            $remove.remove();

            // console.log('$remove', $remove);
            // exclude annotations
            if ($remove && $remove[0] && $remove[0].outerHTML && $remove[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
                }
                else {
                    if ($remove && $remove.selector) {
                        $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                    }
                    else if ($remove && $remove.originalEvent) {
                        $('#dremove')[0].innerHTML = `${$remove.type}`;
                    }
                    else if (typeof($remove) == 'object') {
                        try {
                            $('#dremove')[0].innerHTML = JSON.stringify($remove);
                        }
                        catch {
                            $('#dremove')[0].innerHTML = `${$remove}`;
                        }
                    }
                    else {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
            }
        
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );

            // console.log('position', position);
            // exclude annotations
            if (position && position[0] && position[0].outerHTML && position[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `${h2t(addNewlines(position[0].outerHTML, 'position'))}`;
                }
                else {
                    if (position && position.selector) {
                        $('#position')[0].innerHTML = `${position.selector} (we output the selector when length is 0)`;
                    }
                    else if (position && position.originalEvent) {
                        $('#position')[0].innerHTML = `${position.type}`;
                    }
                    else if (typeof(position) == 'object') {
                        try {
                            $('#position')[0].innerHTML = JSON.stringify(position);
                        }
                        catch {
                            $('#position')[0].innerHTML = `${position}`;
                        }
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`;
                    }
                }
            }
        
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );

            // console.log('position', position);
            // exclude annotations
            if (position && position[0] && position[0].outerHTML && position[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `${h2t(addNewlines(position[0].outerHTML, 'position'))}`;
                }
                else {
                    if (position && position.selector) {
                        $('#position')[0].innerHTML = `${position.selector} (we output the selector when length is 0)`;
                    }
                    else if (position && position.originalEvent) {
                        $('#position')[0].innerHTML = `${position.type}`;
                    }
                    else if (typeof(position) == 'object') {
                        try {
                            $('#position')[0].innerHTML = JSON.stringify(position);
                        }
                        catch {
                            $('#position')[0].innerHTML = `${position}`;
                        }
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`;
                    }
                }
            }
        
            update();
        }
    }

    $container.on("mousedown touchstart", function (e) {
        if (e.button && e.button >= 2) {
            return;
        }
        var pos = eventPos(e);
        scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
        $(document).on(e.type == "mousedown" ? "mousemove" : "touchmove", drag);
        e.preventDefault();
    });
    $(document).on("mouseup touchend", function (e) {
        $(document).off("mousemove touchmove", drag);
        scroll_delta = null;
    });
};

/* 50:72:6f:50:75:6b:65:20:69:73:20:61:77:65:73:6f:6d:65 */

$(function () {
    var map = new Map($("#comic"));
});

let codeToShow = '"/* update:71:114 */\n    function update() {\n        $map.css({\n            left: position[0],\n            top: position[1]\n        });\n\n        var centre_last = centre;\n        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];\n\n        function tile_name(x, y) {\n            x -= size[3];\n            y -= size[0];\n            return (y >= 0 ? y + 1 + \"s\" : -y + \"n\") + (x >= 0 ? x + 1 + \"e\" : -x + \"w\");\n        }\n\n        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {\n            var $remove = $map.children().not(\".ground\");\n\n            for (var y = -1; y <= +1; y++) {\n                for (var x = -1; x <= +1; x++) {\n                    var name = tile_name(centre[0] + x, centre[1] + y);\n                    var tile = $map.find(\".tile\" + name);\n\n                    if (tile.length) {\n                        $remove = $remove.not(tile);\n                    } else {\n                        var $image = $(\n                            \"<img class=\\\"tile\" + name + \"\\\" src=\\\"http://imgs.xkcd.com/clickdrag/\" + name + \".png\\\" style=\\\"top:\" + (centre[1] + y) * tilesize + \"px;left:\" + (centre[0] + x) * tilesize + \"px; z-index: -1; position: absolute;;\\\" style=\\\"display:none\\\" />\"\n                        );\n\n                        $image.load(function() {\n                            $(this).show();\n                        }).error(function() {\n                            $(this).remove();\n                        });\n\n                        $map.append($image);\n                    }\n                }\n            }\n\n            $remove.remove();\n        }\n    }"'
        codeToShow = codeToShow.substring(1, codeToShow.length - 2);
        document.getElementById("codetoshow").innerHTML = getTutoronifiedHTML(codeToShow);

    }

    render() {
        
        var prevNotes = getPrevNotes();
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises</div>
                <br/><br/><br/>
                DOM
                <p>{prevNotes}</p>
                <div id="comic"><div className="map"><div className="ground"></div></div></div>
                <br/>
                <div className="exercises">
                    Variables:
                    <br/><br/>
                    <p id='dmap_p'>$map = <span className ="pt" id='dmap'> </span> </p><HAButton id="dmap_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='dmap_notes'></textarea>
<p id='position_p'>position = <span className ="pt" id='position'> </span> </p><HAButton id="position_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='position_notes'></textarea>
<p id='centre_last_p'>centre_last = <span className ="pt" id='centre_last'> </span> </p><HAButton id="centre_last_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='centre_last_notes'></textarea>
<p id='centre_p'>centre = <span className ="pt" id='centre'> </span> </p><HAButton id="centre_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='centre_notes'></textarea>
<p id='tilesize_p'>tilesize = <span className ="pt" id='tilesize'> </span> </p><HAButton id="tilesize_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='tilesize_notes'></textarea>
<p id='dremove_p'>$remove = <span className ="pt" id='dremove'> </span> </p><HAButton id="dremove_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='dremove_notes'></textarea>
<p id='name_p'>name = <span className ="pt" id='name'> </span> </p><HAButton id="name_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='name_notes'></textarea>
<p id='tile_p'>tile = <span className ="pt" id='tile'> </span> </p><HAButton id="tile_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='tile_notes'></textarea>
<p id='dimage_p'>$image = <span className ="pt" id='dimage'> </span> </p><HAButton id="dimage_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='dimage_notes'></textarea>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <pre id="codetoshow"></pre>
                        <p>What is happening in the code?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: $image, $map, name, centre_last, position, centre, tilesize, tile, $remove? </p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                    </div>
                    <a href='/exercise-auto9'>Next Exercise</a>
                </div>
            </div>
        )
    }
}
    