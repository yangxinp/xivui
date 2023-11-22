import fs from 'fs'
import path from 'path'
import prismjs from 'prismjs'
import type MarkdownIt from 'markdown-it'

import loadLanguages from 'prismjs/components/index'
loadLanguages(['markup', 'css', 'javascript'])

const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS: { [key: string] : string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch: string) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str: string) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

function highlight(str: string, lang: string) {
  if (!lang) return `<pre v-pre><code>${escapeHtml(str)}</code></pre>`

  let _lang = lang.toLowerCase()
  if (_lang === 'md') lang = 'markdown'
  if (['vue', 'html'].includes(_lang)) _lang = 'markup'
  if (['tsx', 'ts'].includes(_lang)) _lang = 'typescript'

  if (!prismjs.languages[_lang]) {
    try {
      loadLanguages([_lang])
    } catch (e) {
      console.error('language is not supported')
    }
  }

  return `<pre v-pre><code>${prismjs.highlight(str, prismjs.languages[_lang], _lang)}</code></pre>`
}

function demo(md: MarkdownIt, options: {}) {
  var marker_str = ':',
      marker_cha = marker_str.charCodeAt(0),
      marker_min = 3

  function validate (markup: string, params: string) : boolean {
    return /^demo\s*(?:.*)$/.test(params.trim())
  }

  function encodeInfo(markup: string, params: string) {
    var match = params.match(/^demo\s*(.*)$/)

    return {
      path: match ? match[1] : undefined
    }
  }

  md.renderer.rules.container = function(tokens, idx, options, env, slf) {
    var token = tokens[idx],
        encode_info = encodeInfo(token.markup, token.info),
        src = "'../../examples/" + encode_info.path + ".vue'",
        source = fs.readFileSync(path.resolve(__dirname, "../../examples", encode_info.path + '.vue'), 'utf-8')

    return '<Demo :demo="demos[' + src +'].default" source="' + encodeURIComponent(highlight(source, 'vue')) + '"></Demo>'
  }

  md.block.ruler.before('fence', 'container', function (state, startLine, endLine, silent) {
    var len, params, nextLine, mem, token, markup,
        haveEndMarker = false,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos + marker_min > max) { return false; }
    if (marker_cha !== state.src.charCodeAt(pos)) { return false; }

    mem = pos;
    pos = state.skipChars(pos, marker_cha);
  
    len = pos - mem;
  
    if (len < marker_min) { return false; }
  
    markup = state.src.slice(mem, pos);
    params = state.src.slice(pos, max);

    if(!validate(markup, params)) { return false; }
  
    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }
  
    // search end of block
    nextLine = startLine;
  
    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }
  
      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
  
      if (pos < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }
  
      if (state.src.charCodeAt(pos) !== marker_cha) { continue; }
  
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }
  
      pos = state.skipChars(pos, marker_cha);
  
      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) { continue; }
  
      // make sure tail has spaces only
      pos = state.skipSpaces(pos); 
  
      if (pos < max) { continue; }
  
      haveEndMarker = true;
      // found!
      break;
    }
  
    // If a fence has heading spaces, they should be removed from its inner block
    len = state.sCount[startLine];
  
    state.line = nextLine + (haveEndMarker ? 1 : 0);
  
    token         = state.push('container', 'code', 0);
    token.info    = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup  = markup;
    token.map     = [ startLine, state.line ];
  
    return true;
  })
}

export default demo