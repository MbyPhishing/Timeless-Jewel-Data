﻿const _0x454cf0 = _0x1703; (function (_0x50e271, _0x18cf82) { const _0x3607c9 = _0x1703, _0x667e13 = _0x50e271(); while (!![]) { try { const _0x3560f0 = -parseInt(_0x3607c9(0x103)) / 0x1 + -parseInt(_0x3607c9(0x131)) / 0x2 * (parseInt(_0x3607c9(0x12b)) / 0x3) + -parseInt(_0x3607c9(0x115)) / 0x4 + parseInt(_0x3607c9(0x157)) / 0x5 * (-parseInt(_0x3607c9(0x149)) / 0x6) + parseInt(_0x3607c9(0x102)) / 0x7 + -parseInt(_0x3607c9(0xe6)) / 0x8 * (-parseInt(_0x3607c9(0x128)) / 0x9) + -parseInt(_0x3607c9(0x160)) / 0xa * (-parseInt(_0x3607c9(0xeb)) / 0xb); if (_0x3560f0 === _0x18cf82) break; else _0x667e13['push'](_0x667e13['shift']()); } catch (_0x2b881b) { _0x667e13['push'](_0x667e13['shift']()); } } }(_0xe286, 0x44482)); let svg, zoomPanWrapper, offsetX = 0x0, offsetY = 0x0, baseScale = 0.15, scale = baseScale; const supabaseUrl = 'https://kctpkiogrhujxkozifpm.supabase.co', supabaseKey = _0x454cf0(0x15b), supabase = window['supabase'][_0x454cf0(0x147)](supabaseUrl, supabaseKey); function initializeSvgClickPan() { const _0x29abc4 = _0x454cf0; centerAndZoomTree(), svg = document[_0x29abc4(0xed)]('passive-tree-svg'), zoomPanWrapper = svg?.[_0x29abc4(0x100)](_0x29abc4(0x109)); if (!svg || !zoomPanWrapper) { console[_0x29abc4(0x127)](_0x29abc4(0x122)); return; } const _0x1a90b2 = document[_0x29abc4(0xed)](_0x29abc4(0xfe)); _0x1a90b2 && _0x1a90b2['addEventListener']('click', centerAndZoomTree), document[_0x29abc4(0x154)](_0x29abc4(0x16c))[_0x29abc4(0x10a)](_0x34334f => { const _0x26ada2 = _0x29abc4; _0x34334f[_0x26ada2(0x11e)](_0x26ada2(0x10d), function () { panAndZoomToNode(this), handleJewelSocketClick(this); }); }), document[_0x29abc4(0x154)](_0x29abc4(0x165))[_0x29abc4(0x10a)](_0x13949f => { const _0xe00c78 = _0x29abc4; _0x13949f[_0xe00c78(0x11e)](_0xe00c78(0x116), showTooltip), _0x13949f[_0xe00c78(0x11e)](_0xe00c78(0xef), moveTooltip), _0x13949f[_0xe00c78(0x11e)]('mouseout', hideTooltip); }), document[_0x29abc4(0xed)]('seed')[_0x29abc4(0x11e)](_0x29abc4(0x112), handleJewelSocketUpdate), document[_0x29abc4(0xed)]('conqueror')['addEventListener'](_0x29abc4(0x112), handleJewelSocketUpdate); } async function handleJewelSocketUpdate() { const _0x2f6cc0 = _0x454cf0; let _0x9b8bde = document[_0x2f6cc0(0x100)](_0x2f6cc0(0x16f)); _0x9b8bde && await handleJewelSocketClick(_0x9b8bde); } function _0x1703(_0x4c0b1c, _0x2200c1) { const _0xe286d7 = _0xe286(); return _0x1703 = function (_0x170329, _0x65ff36) { _0x170329 = _0x170329 - 0xe5; let _0x56e14c = _0xe286d7[_0x170329]; return _0x56e14c; }, _0x1703(_0x4c0b1c, _0x2200c1); } function showTooltip(_0x3fd83f) { const _0x231680 = _0x454cf0, _0x4cf3dd = document[_0x231680(0xed)](_0x231680(0x167)), _0x1f0def = _0x3fd83f['target']['getAttribute'](_0x231680(0x101)), _0x4d6e79 = _0x3fd83f[_0x231680(0x158)][_0x231680(0x124)](_0x231680(0x121)); _0x1f0def && (_0x4d6e79 ? _0x4cf3dd[_0x231680(0x150)] = _0x1f0def + _0x231680(0x13f) + _0x4d6e79 + ')' : _0x4cf3dd[_0x231680(0x150)] = _0x1f0def, _0x4cf3dd[_0x231680(0x10f)][_0x231680(0x174)] = _0x231680(0x15d), _0x4cf3dd[_0x231680(0x10f)]['fontSize'] = '16px'); } function moveTooltip(_0x5ad1fc) { const _0x4abfb5 = _0x454cf0, _0x1f15af = document[_0x4abfb5(0xed)](_0x4abfb5(0x167)); _0x1f15af['style'][_0x4abfb5(0x14f)] = _0x5ad1fc['pageX'] + 0xa + 'px', _0x1f15af[_0x4abfb5(0x10f)][_0x4abfb5(0x111)] = _0x5ad1fc[_0x4abfb5(0x130)] + 0xa + 'px'; } function hideTooltip() { const _0x317f41 = _0x454cf0, _0x30f54f = document[_0x317f41(0xed)](_0x317f41(0x167)); _0x30f54f[_0x317f41(0x10f)][_0x317f41(0x174)] = _0x317f41(0x10e); } async function handleJewelSocketClick(_0x521935) { const _0x290a37 = _0x454cf0; if (!_0x521935) return; document[_0x290a37(0x154)]('.notable-node')['forEach'](_0x4d2fd5 => { const _0x115da9 = _0x290a37; _0x4d2fd5['classList'][_0x115da9(0x141)](_0x115da9(0x152)); }), document['querySelectorAll'](_0x290a37(0x16c))[_0x290a37(0x10a)](_0x28a686 => _0x28a686[_0x290a37(0xf3)](_0x290a37(0x140))), _0x521935['setAttribute'](_0x290a37(0x140), _0x290a37(0x12f)); const _0x4cce95 = _0x521935['getAttribute']('id'), _0x15adad = document[_0x290a37(0xed)]('seed')[_0x290a37(0x120)], _0x4c1bf7 = document[_0x290a37(0xed)](_0x290a37(0xf6))[_0x290a37(0x120)], { data: _0x2c8f9d, error: _0x3c58df } = await supabase['from']('notable_submissions')[_0x290a37(0xe7)]('notables')['eq'](_0x290a37(0x16d), _0x4cce95)['eq'](_0x290a37(0x137), parseInt(_0x15adad))['eq'](_0x290a37(0xf6), _0x4c1bf7)['maybeSingle']({ 'headers': { 'Accept': _0x290a37(0x136) } }); _0x3c58df && _0x3c58df[_0x290a37(0x13c)] !== _0x290a37(0x172) && console[_0x290a37(0x127)](_0x290a37(0x118), _0x3c58df); let _0x51c039 = []; _0x2c8f9d && _0x2c8f9d[_0x290a37(0x135)] && (_0x51c039 = JSON[_0x290a37(0x129)](_0x2c8f9d[_0x290a37(0x135)])); const _0x58a8d1 = parseFloat(_0x521935[_0x290a37(0x124)]('cx')), _0x551bca = parseFloat(_0x521935[_0x290a37(0x124)]('cy')); if (isNaN(_0x58a8d1) || isNaN(_0x551bca)) { console[_0x290a37(0x127)]('Error:\x20Jewel\x20socket\x20coordinates\x20not\x20found.'); return; } const _0x24db21 = 0xaf; let _0x4768ff = document[_0x290a37(0xed)](_0x290a37(0x143)); if (_0x4768ff) _0x4768ff[_0x290a37(0x141)](); const _0x291358 = document[_0x290a37(0xea)](_0x290a37(0x15c), _0x290a37(0x14b)); _0x291358[_0x290a37(0x148)]('id', _0x290a37(0x143)), _0x291358[_0x290a37(0x148)]('cx', _0x58a8d1), _0x291358[_0x290a37(0x148)]('cy', _0x551bca), _0x291358['setAttribute']('r', _0x24db21), _0x291358[_0x290a37(0x148)](_0x290a37(0x13d), 'none'), _0x291358[_0x290a37(0x148)](_0x290a37(0x166), _0x290a37(0x12c)), _0x291358[_0x290a37(0x148)](_0x290a37(0x113), '2'), _0x291358[_0x290a37(0x148)](_0x290a37(0x14a), _0x290a37(0xe8)), document[_0x290a37(0xed)](_0x290a37(0xff))[_0x290a37(0x11c)](_0x291358), panAndZoomToNode(_0x521935), findNotableNodesInRange(parseFloat(_0x521935[_0x290a37(0x124)]('cx')), parseFloat(_0x521935[_0x290a37(0x124)]('cy')), 0xaf, _0x521935, _0x51c039); } function panAndZoomToNode(_0x263852) { const _0x5f51ec = _0x454cf0, _0x2cfb5d = parseFloat(_0x263852[_0x5f51ec(0x124)]('cx')), _0x3055f1 = parseFloat(_0x263852[_0x5f51ec(0x124)]('cy')); document['getElementById'](_0x5f51ec(0xfe))['style'][_0x5f51ec(0x174)] = _0x5f51ec(0x15d); if (isNaN(_0x2cfb5d) || isNaN(_0x3055f1)) { console['error'](_0x5f51ec(0x119)); return; } const _0x145669 = window[_0x5f51ec(0xfc)], _0x438a12 = window[_0x5f51ec(0x126)]; offsetX = _0x145669 / 0x2 - _0x2cfb5d * scale, offsetY = _0x438a12 / 0x2 - _0x3055f1 * scale, zoomPanWrapper[_0x5f51ec(0x10f)][_0x5f51ec(0xfa)] = _0x5f51ec(0xf9), zoomPanWrapper[_0x5f51ec(0x148)](_0x5f51ec(0x11d), 'translate(' + offsetX + ',\x20' + offsetY + _0x5f51ec(0x162) + scale + ')'), setTimeout(() => { const _0x3c1ff8 = _0x5f51ec; scale = 1.2, offsetX = _0x145669 / 0x2 - _0x2cfb5d * scale, offsetY = _0x438a12 / 0x2 - _0x3055f1 * scale, zoomPanWrapper[_0x3c1ff8(0x10f)][_0x3c1ff8(0xfa)] = _0x3c1ff8(0xf9), zoomPanWrapper[_0x3c1ff8(0x148)](_0x3c1ff8(0x11d), _0x3c1ff8(0x151) + offsetX + ',\x20' + offsetY + _0x3c1ff8(0x162) + scale + ')'); }, 0x190); } function findNotableNodesInRange(_0x33fb49, _0x32ffa9, _0x580210, _0x2f7766, _0x22a1b1 = []) { const _0x22bb06 = _0x454cf0; document[_0x22bb06(0x154)](_0x22bb06(0x165))[_0x22bb06(0x10a)](_0x554d49 => { const _0x540f55 = _0x22bb06; _0x554d49['setAttribute'](_0x540f55(0x13d), 'gray'); }); let _0x1a196f = []; document[_0x22bb06(0x154)](_0x22bb06(0xe5))[_0x22bb06(0x10a)](_0x2542ea => { const _0x17ab73 = _0x22bb06; _0x2542ea[_0x17ab73(0xf3)]('data-alternate'); }), document['querySelectorAll'](_0x22bb06(0xe5))['forEach'](_0x22d258 => { const _0x39a526 = _0x22bb06, _0x36e7b1 = parseFloat(_0x22d258[_0x39a526(0x124)]('cx')), _0x43ffdc = parseFloat(_0x22d258[_0x39a526(0x124)]('cy')); if (!isNaN(_0x36e7b1) && !isNaN(_0x43ffdc)) { const _0x479ae7 = Math['sqrt']((_0x36e7b1 - _0x33fb49) ** 0x2 + (_0x43ffdc - _0x32ffa9) ** 0x2); if (_0x479ae7 <= _0x580210) { const _0x2ee961 = _0x22d258['getAttribute']('data-name'); if (_0x2ee961 && _0x2ee961 !== _0x39a526(0x155)) { let _0x4b1b37 = _0x22a1b1[_0x39a526(0xf2)](_0x21d891 => _0x21d891[_0x39a526(0x13b)] === _0x2ee961)?.[_0x39a526(0x10c)] || ''; _0x4b1b37 ? _0x22d258['setAttribute'](_0x39a526(0x121), _0x4b1b37) : _0x22d258[_0x39a526(0xf3)](_0x39a526(0x121)), _0x22d258[_0x39a526(0x148)](_0x39a526(0x13d), _0x39a526(0x164)), _0x1a196f[_0x39a526(0x168)]({ 'name': _0x2ee961, 'x': _0x36e7b1, 'y': _0x43ffdc, 'alternate': _0x4b1b37 }); } } } }), updateNotableList(_0x1a196f, _0x2f7766); } function _0xe286() { const _0x17597f = ['createElement', '100%', 'transform\x200.4s\x20ease-in-out', 'transition', 'Error\x20inserting\x20data:', 'innerWidth', 'placeholder', 'reset-zoom-button', 'zoom-pan-wrapper', 'querySelector', 'data-name', '115479KoPaAA', '419105kNRVJz', 'height', 'stringify', 'button', 'center', '0px\x2020px', '#zoom-pan-wrapper', 'forEach', 'Error\x20checking\x20existing\x20data:', 'alternate', 'click', 'none', 'style', 'width', 'top', 'change', 'stroke-width', 'Error\x20checking\x20existing\x20data.', '1739128vUiGWP', 'mouseover', 'Error\x20updating\x20data:', 'Error\x20fetching\x20data:', 'Node\x20coordinates\x20are\x20invalid!', 'notable-list', 'notable-list-container', 'appendChild', 'transform', 'addEventListener', '16px', 'value', 'data-alternate', 'SVG\x20or\x20zoom-pan-wrapper\x20not\x20found!', '0px', 'getAttribute', '.summary-item', 'innerHeight', 'error', '17370oXMtsw', 'parse', 'notable_submissions', '10314DicfTN', 'white', 'toLowerCase', 'Notables\x20submitted\x20successfully!', 'true', 'pageY', '266TWlJxq', 'flex', 'alignItems', '\x20|\x20', 'notables', 'application/json', 'seed', 'length', 'add', 'div', 'original', 'code', 'fill', 'summary-container', '\x20(Alt:\x20', 'selected', 'remove', '10px', 'radius-visual', '#notable-list\x20input', 'alternate-summary', 'insert', 'createClient', 'setAttribute', '30936hKSuZC', 'stroke-dasharray', 'circle', 'trim', 'classList', 'fontSize', 'left', 'textContent', 'translate(', 'highlighted', '150px', 'querySelectorAll', 'Unknown\x20Node', 'right', '110rfZPDi', 'target', 'input', 'margin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdHBraW9ncmh1anhrb3ppZnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjE3NTYsImV4cCI6MjA1NDg5Nzc1Nn0.fKjso6WZ3tTNvlL2BVa6LnRze8QdhrvlGX3Gprejngw', 'http://www.w3.org/2000/svg', 'block', 'marginTop', 'Submit', '610Dsaxfe', 'text', ')\x20scale(', '1px', 'yellow', '.notable-node', 'stroke', 'tooltip', 'push', 'name', 'from', 'getBBox', '.jewel-socket-socket', 'socket_id', 'submitNotables', '.jewel-socket-socket[selected]', 'marginBottom', '<h4>Replaced\x20Passives\x20(click\x20to\x20find)</h4>', 'PGRST116', '<p>Seed\x20yet\x20to\x20be\x20discovered.</p>', 'display', '.jewel-socket-ring,\x20.notable-node', '928KdxhUI', 'select', '5,5', 'textAlign', 'createElementNS', '263978yNuCiE', '5px', 'getElementById', 'Failed\x20to\x20submit\x20data.', 'mousemove', 'update', 'dataset', 'find', 'removeAttribute', 'innerHTML', 'Failed\x20to\x20update\x20data.', 'conqueror']; _0xe286 = function () { return _0x17597f; }; return _0xe286(); } function updateNotableList(_0x380e63, _0x8798b5) { const _0x441571 = _0x454cf0, _0x2e37f8 = document['getElementById'](_0x441571(0x11a)); if (!_0x2e37f8) return; _0x2e37f8[_0x441571(0xf4)] = ''; if (_0x380e63['length'] === 0x0) { _0x2e37f8[_0x441571(0xf4)] = _0x441571(0x173); return; } _0x380e63['forEach'](_0x8a7c06 => { const _0x39fd6d = _0x441571; let _0x111af5 = document[_0x39fd6d(0xf7)](_0x39fd6d(0x13a)); _0x111af5['style']['display'] = _0x39fd6d(0x132), _0x111af5[_0x39fd6d(0x10f)][_0x39fd6d(0x133)] = 'center', _0x111af5['style'][_0x39fd6d(0x170)] = _0x39fd6d(0xec), _0x111af5[_0x39fd6d(0x10f)][_0x39fd6d(0x15a)] = _0x39fd6d(0x123), _0x111af5[_0x39fd6d(0x10f)]['padding'] = _0x39fd6d(0x123); let _0x51012d = document[_0x39fd6d(0xf7)]('span'); _0x51012d[_0x39fd6d(0x150)] = _0x8a7c06['name'], _0x51012d[_0x39fd6d(0x10f)][_0x39fd6d(0x132)] = '1', _0x51012d[_0x39fd6d(0x10f)]['width'] = _0x39fd6d(0x153), _0x51012d[_0x39fd6d(0x10f)][_0x39fd6d(0xe9)] = _0x39fd6d(0x156), _0x51012d['style'][_0x39fd6d(0x14e)] = _0x39fd6d(0x11f); let _0x581f28 = document[_0x39fd6d(0xf7)]('span'); _0x581f28['textContent'] = _0x39fd6d(0x134), _0x581f28[_0x39fd6d(0x10f)][_0x39fd6d(0x15a)] = _0x39fd6d(0x108), _0x581f28['style'][_0x39fd6d(0x110)] = _0x39fd6d(0x163); let _0x334b54 = document[_0x39fd6d(0xf7)](_0x39fd6d(0x159)); _0x334b54['type'] = _0x39fd6d(0x161), _0x334b54[_0x39fd6d(0xfd)] = 'Enter\x20alt\x20notable', _0x334b54[_0x39fd6d(0xf1)]['nodeName'] = _0x8a7c06[_0x39fd6d(0x169)], _0x334b54[_0x39fd6d(0x120)] = _0x8a7c06[_0x39fd6d(0x10c)], _0x111af5[_0x39fd6d(0x11c)](_0x51012d), _0x111af5['appendChild'](_0x581f28), _0x111af5[_0x39fd6d(0x11c)](_0x334b54), _0x2e37f8[_0x39fd6d(0x11c)](_0x111af5); }); let _0x4f19b5 = document[_0x441571(0xf7)](_0x441571(0x13a)); _0x4f19b5[_0x441571(0x10f)]['textAlign'] = _0x441571(0x107), _0x4f19b5[_0x441571(0x10f)]['marginTop'] = '10px', _0x4f19b5[_0x441571(0x10f)][_0x441571(0x110)] = _0x441571(0xf8); let _0x1e2224 = document[_0x441571(0xf7)](_0x441571(0x106)); _0x1e2224[_0x441571(0x150)] = _0x441571(0x15f), _0x1e2224['style'][_0x441571(0x15e)] = _0x441571(0x142), _0x1e2224['id'] = _0x441571(0x16e), _0x1e2224['onclick'] = () => submitNotableSelections(_0x8798b5), _0x4f19b5[_0x441571(0x11c)](_0x1e2224), _0x2e37f8[_0x441571(0x11c)](_0x4f19b5); let _0x4e06ef = document[_0x441571(0xed)](_0x441571(0x145)); !_0x4e06ef && (_0x4e06ef = document[_0x441571(0xf7)](_0x441571(0x13a)), _0x4e06ef['id'] = _0x441571(0x145), _0x4e06ef[_0x441571(0xf4)] = '<h4>Alternate\x20Passive\x20Summary</h4><p>Loading...</p>', document[_0x441571(0xed)]('summary-container')[_0x441571(0x11c)](_0x4e06ef)), document[_0x441571(0xed)](_0x441571(0x13e))['style'][_0x441571(0x174)] = _0x441571(0x15d), document[_0x441571(0xed)](_0x441571(0x11b))[_0x441571(0x10f)]['display'] = _0x441571(0x15d), updateAlternateSummary(); } function updateAlternateSummary() { const _0x5f0997 = _0x454cf0; let _0x344968 = {}, _0x2c5391 = document[_0x5f0997(0x154)]('#notable-list\x20input'); _0x2c5391[_0x5f0997(0x10a)](_0x4d2c8d => { const _0x447861 = _0x5f0997; let _0x11e837 = _0x4d2c8d[_0x447861(0x120)]['trim'](); _0x11e837 && (_0x344968[_0x11e837] = (_0x344968[_0x11e837] || 0x0) + 0x1); }); let _0xce6269 = Object['entries'](_0x344968)['sort']((_0x178055, _0x51d419) => _0x51d419[0x1] - _0x178055[0x1])['map'](([_0x221ed0, _0x480099]) => ({ 'name': _0x221ed0, 'count': _0x480099 })), _0x19cd74 = document[_0x5f0997(0xed)]('alternate-summary'); _0x19cd74 && (_0x19cd74[_0x5f0997(0xf4)] = _0x5f0997(0x171), _0xce6269[_0x5f0997(0x138)] ? _0xce6269[_0x5f0997(0x10a)](({ name: _0x3bc8c0, count: _0x3186fd }) => { const _0x3b1f19 = _0x5f0997; let _0x2f1703 = document[_0x3b1f19(0xf7)]('div'); _0x2f1703[_0x3b1f19(0x14d)][_0x3b1f19(0x139)]('summary-item'), _0x2f1703[_0x3b1f19(0x150)] = '(' + _0x3186fd + ')\x20' + _0x3bc8c0, _0x2f1703[_0x3b1f19(0x11e)](_0x3b1f19(0x10d), function () { const _0x12c7a4 = _0x3b1f19; document['querySelectorAll'](_0x12c7a4(0x125))['forEach'](_0x2ba8dc => { const _0x150dd6 = _0x12c7a4; _0x2ba8dc[_0x150dd6(0x14d)][_0x150dd6(0x141)](_0x150dd6(0x140)); }), this['classList'][_0x12c7a4(0x139)](_0x12c7a4(0x140)), highlightNotables(_0x3bc8c0); }), _0x19cd74[_0x3b1f19(0x11c)](_0x2f1703); }) : _0x19cd74[_0x5f0997(0xf4)] += _0x5f0997(0x173)), _0x19cd74[_0x5f0997(0x10f)][_0x5f0997(0x174)] = _0x5f0997(0x15d); } function highlightNotables(_0x5a5968) { const _0x31ab1d = _0x454cf0; document[_0x31ab1d(0x154)]('.notable-node')[_0x31ab1d(0x10a)](_0x13c928 => { const _0x458b15 = _0x31ab1d; _0x13c928[_0x458b15(0x14d)][_0x458b15(0x141)](_0x458b15(0x152)); }), document['querySelectorAll'](_0x31ab1d(0x165))[_0x31ab1d(0x10a)](_0x5d2731 => { const _0x1524fe = _0x31ab1d; let _0x22a970 = _0x5d2731[_0x1524fe(0x124)](_0x1524fe(0x121)); _0x22a970 === _0x5a5968 && _0x5d2731[_0x1524fe(0x14d)][_0x1524fe(0x139)](_0x1524fe(0x152)); }); } function centerAndZoomTree() { const _0x57cc01 = _0x454cf0, _0x1a2c6b = document[_0x57cc01(0xed)]('zoom-pan-wrapper'); if (!_0x1a2c6b) return; document[_0x57cc01(0xed)](_0x57cc01(0xfe))[_0x57cc01(0x10f)][_0x57cc01(0x174)] = _0x57cc01(0x10e), document[_0x57cc01(0x154)](_0x57cc01(0x16c))['forEach'](_0x46d245 => _0x46d245[_0x57cc01(0xf3)](_0x57cc01(0x140))), document[_0x57cc01(0x154)](_0x57cc01(0x165))['forEach'](_0x1c7241 => { const _0x14699a = _0x57cc01; _0x1c7241[_0x14699a(0x14d)][_0x14699a(0x141)](_0x14699a(0x152)); }), document[_0x57cc01(0xed)]('summary-container')[_0x57cc01(0x10f)][_0x57cc01(0x174)] = _0x57cc01(0x10e), document[_0x57cc01(0xed)](_0x57cc01(0x11b))[_0x57cc01(0x10f)][_0x57cc01(0x174)] = _0x57cc01(0x10e); const _0x321b02 = _0x1a2c6b[_0x57cc01(0x16b)](), _0x4211b3 = window['innerWidth'], _0x231705 = window['innerHeight']; scale = baseScale, offsetX = _0x4211b3 / 0x2 - (_0x321b02['x'] + _0x321b02['width'] / 0x2) * scale, offsetY = _0x231705 / 0x2 - (_0x321b02['y'] + _0x321b02[_0x57cc01(0x104)] / 0x2) * scale, _0x1a2c6b[_0x57cc01(0x148)](_0x57cc01(0x11d), _0x57cc01(0x151) + offsetX + ',\x20' + offsetY + ')\x20scale(0.32)'); } async function submitNotableSelections(_0x44b2b6) { const _0x1346f9 = _0x454cf0, _0x94d9fe = document[_0x1346f9(0xed)](_0x1346f9(0x137))[_0x1346f9(0x120)], _0x6eecc5 = document[_0x1346f9(0xed)](_0x1346f9(0xf6))[_0x1346f9(0x120)], _0xd29dd4 = _0x44b2b6[_0x1346f9(0x124)]('id'); let _0x3d3494 = document[_0x1346f9(0x154)](_0x1346f9(0x144)), _0x48c0c1 = []; _0x3d3494[_0x1346f9(0x10a)](_0x1aef6b => { const _0x2b8548 = _0x1346f9; let _0x4d9f55 = _0x1aef6b[_0x2b8548(0xf1)]['nodeName'], _0x58de4c = _0x1aef6b['value'][_0x2b8548(0x14c)]()[_0x2b8548(0x12d)](); _0x48c0c1['push']({ 'original': _0x4d9f55, 'alternate': _0x58de4c || null }); }); const { data: _0x35a583, error: _0xfcaea3 } = await supabase[_0x1346f9(0x16a)](_0x1346f9(0x12a))[_0x1346f9(0xe7)]('id')['eq'](_0x1346f9(0x16d), _0xd29dd4)['eq'](_0x1346f9(0x137), parseInt(_0x94d9fe))['eq'](_0x1346f9(0xf6), _0x6eecc5)['maybeSingle'](); if (_0xfcaea3 && _0xfcaea3[_0x1346f9(0x13c)] !== _0x1346f9(0x172)) { console[_0x1346f9(0x127)](_0x1346f9(0x10b), _0xfcaea3), alert(_0x1346f9(0x114)); return; } if (_0x35a583) { const { error: _0x4eb293 } = await supabase[_0x1346f9(0x16a)](_0x1346f9(0x12a))[_0x1346f9(0xf0)]({ 'notables': JSON[_0x1346f9(0x105)](_0x48c0c1) })['eq']('id', _0x35a583['id']); _0x4eb293 ? (console['error'](_0x1346f9(0x117), _0x4eb293), alert(_0x1346f9(0xf5))) : alert('Notables\x20updated\x20successfully!'); } else { const { error: _0xcb59f7 } = await supabase[_0x1346f9(0x16a)](_0x1346f9(0x12a))[_0x1346f9(0x146)]([{ 'socket_id': _0xd29dd4, 'seed': parseInt(_0x94d9fe), 'conqueror': _0x6eecc5, 'notables': JSON[_0x1346f9(0x105)](_0x48c0c1) }]); _0xcb59f7 ? (console[_0x1346f9(0x127)](_0x1346f9(0xfb), _0xcb59f7), alert(_0x1346f9(0xee))) : alert(_0x1346f9(0x12e)); } }