//Version: 20231210-10:09
const DHTML = document.getElementById || document.all; const avatar_path = "/images/avatar/"; const use_slug = true; function getbyid(id) { let val = null; if (document.getElementById) { val = document.getElementById(id) } else if (document.all) { val = document.all[id] } return val } function toggler(divId) { $("#" + divId).toggle() } let pclk = 0; let pnum_all = 0; let plmt = 0; function load_pg(num_all, pg_limit, pg_no) { $("#prloading").toggle(true); pclk = pg_no; document.body.style.cursor = "wait"; $("#sendreq").find('input[name="pg_no"]').val(pg_no); $.ajax({ url: $("#sendreq").attr("action"), type: "POST", dataType: "json", data: $("#sendreq").serialize(), success: function (text) { RedirectLocation("LcAnchor", "p" + pg_no, "#p" + pg_no); document.body.style.cursor = "default"; showListItems(text, true); chg_pgn(num_all, pg_limit, pg_no); $("#prloading").toggle(false) } }) } function search_pg(num_all, pg_limit, pg_no, search_lc, _cb) { if (typeof search_lc === "undefined") search_lc = ""; $("#prloading").toggle(true); pclk = pg_no; document.body.style.cursor = "wait"; $("#sendreq").find('input[name="pg_no"]').val(pg_no); $.ajax({ url: $("#sendreq").attr("action"), type: "POST", dataType: "json", data: $("#sendreq").serialize(), success: function (dataResp) { RedirectLocation("LcAnchor", "p" + pg_no, "#p" + pg_no); document.body.style.cursor = "default"; if (parseInt(dataResp["count"]) <= 0) { $("#prloading").toggle(false); $(".dotLoader.nearby").toggle(false); _cb(dataResp); return } showSearchItems(dataResp["items"], true); if (num_all === 0) num_all = dataResp["count"]; if (typeof dataResp["kat_name"] === "undefined" || !dataResp["kat_name"]) $("#rs_kat_name").html(""); else $("#rs_kat_name").html(`<b>${dataResp["kat_name"]}</b>`); chg_pgn(num_all, pg_limit, pg_no, "search_pg"); $("#prloading").toggle(false); $(".dotLoader.nearby").toggle(false); if (typeof _cb !== "undefined") _cb(dataResp) } }) } function showItemOptions(js_adItems, is_vip) { for (let k = 0; k < js_adItems.length; k++) { let siteid = js_adItems[k][0]; if (typeof js_city[js_adItems[k][2]] === "undefined") n = "Tá»‰nh thÃ nh khÃ¡c"; else { n = js_city[js_adItems[k][2]][0] } let n2; if (typeof js_district[js_adItems[k][3]] !== "undefined") { n2 = n + " / " + js_district[js_adItems[k][3]][0] } else if (js_adItems[k][3] && js_adItems[k][3] !== 0) { n2 = n + " / " + js_adItems[k][3] } else { n2 = n } if (is_vip) { getbyid("vitm_loc" + siteid).innerHTML = '<i class="fa fa-map-marker fa-fw"></i> ' + n2 + "" } else { getbyid("itm_loc" + siteid).innerHTML = '<i class="fa fa-map-marker fa-fw"></i> ' + n2 + "" } } } function showImageItems(imgs) { n = imgs.length; for (let i = 0; i < n; i++) { $("#itm_img" + imgs[i][0]).html(imgs[i][1]) } } function insertAdv() { if (isNaN(gAdv) || gAdv >= js_adv.length) { gAdv = 0 } let k = gAdv; if (!js_adv[k]) { gAdv++; return } let adv_img = ""; if (js_adv[k][4]) { adv_img = '<img src="/images/vda/thumbnail/' + js_adv[k][4] + '" width="90" class="img-rounded" alt="">' } let adv_HREF = js_adv[k][2], adv_Title = js_adv[k][1], adv_Descr = js_adv[k][3], adv_Location = js_adv[k][5]; let html = '<a href="' + adv_HREF + '" class="reload" target="_blank">'; html += '<div class="rounded-bo clearfix">'; html += '<div class="rvn-item-image text-center">' + adv_img + "</div>"; html += '<div class="rvn-item-content">'; html += '<div class="rvn-item-no orange"><span class="badge">Q</span></div>'; html += '<div class="rvn-item-title">' + adv_Title + "</div>"; html += '<div class="rvn-item-loca"><i class="fa fa-map-marker fa-fw"></i> ' + adv_Location + "</div>"; html += '<div class="rvn-item-descr"><i class="fa fa-comments fa-fw"></i> ' + adv_Descr + "</div>"; html += "</div>"; html += "</div>"; html += "</a>"; $("#advtype12").html(html); $("#advtype12").removeClass("hidden"); gAdv++ } function showListItems(js_ads, ajax) { let html = ""; let out = ""; let adv_rnd = getRandomInt(1, js_ads.length); let ct = 0; for (let k = 0; k < js_ads.length; k++) { ct++; let siteid = js_ads[k][0]; let site_AdVip = ""; let isOrange = ""; if (js_ads[k][5] === 1 || js_ads[k][5] === 3) { isOrange = " orange" } if (typeof js_city[js_ads[k][2]] === "undefined") n = "Tá»‰nh thÃ nh khÃ¡c"; else { n = js_city[js_ads[k][2]][0] } let n2; if (typeof js_district[js_ads[k][3]] !== "undefined") { n2 = n + " / " + js_district[js_ads[k][3]][0] } else if (js_ads[k][3] && js_ads[k][3] !== 0) { n2 = n + " / " + js_ads[k][3] } else { n2 = n } let site_Locations = '<i class="fa fa-map-marker fa-fw"></i> ' + n2 + ""; let site_Image = '<img src="/images/no-image.png" width="90" alt="no-image">'; if (js_ads[k][17] !== "") { site_Image = js_ads[k][17] } let site_ID = siteid; let site_HREF = js_ads[k][13]; let site_Title = js_ads[k][12]; let site_Date = js_ads[k][6]; let site_Notify = js_ads[k][1]; let site_Hits = js_ads[k][4]; html = '<div class="listItem clearfix hvr-bubble-bottom' + ct % 2 + '">'; html += '<a href="' + site_HREF + '" title="' + site_Title + '" class="reload">'; html += '<div class="rounded-bo clearfix">'; html += '<div class="rvn-item-image text-center" id="itm_img' + site_ID + '">' + site_Image + "</div>"; html += '<div class="rvn-item-content">'; html += site_AdVip; html += '<div class="rvn-item-no' + isOrange + '"><span class="badge">' + site_Notify + "</span></div>"; html += '<div class="rvn-item-title">' + site_Title + "</div>"; html += '<div class="rvn-item-loca" id="itm_loc' + site_ID + '">' + site_Locations + "</div>"; html += '<div class="rvn-item-date"><i class="fa fa-clock-o fa-fw"></i> ' + site_Date + '<span class="rvn-item-views"><i class="fa fa-eye fa-fw"></i> ' + site_Hits + "</span>" + "</div>"; html += "</div>"; html += "</div>"; html += "</a>"; html += "</div>"; if (k === adv_rnd) { ct++; html += '<div class="listItem clearfix hidden hvr-bubble-bottom' + ct % 2 + '" id="advtype12"></div>' } out += html } getbyid("LISTITEMS").innerHTML = out; insertAdv(); showItemOptions(js_ads, false) } function showSearchItems(js_ads, ajax) { let html = ""; let out = ""; let adv_rnd = getRandomInt(1, js_ads.length); let ct = 0; for (let k = 0; k < js_ads.length; k++) { ct++; let siteid = js_ads[k][0]; let site_AdVip = ""; let isOrange = ""; if (parseInt(js_ads[k][5]) === 1 || parseInt(js_ads[k][5]) === 3) { isOrange = " orange" } if (typeof js_city[js_ads[k][2]] === "undefined") n = "Tá»‰nh thÃ nh khÃ¡c"; else { n = js_city[js_ads[k][2]][0] } let n2; if (typeof js_district[js_ads[k][3]] !== "undefined") { n2 = n + " / " + js_district[js_ads[k][3]][0] } else if (js_ads[k][3] && js_ads[k][3] !== 0) { n2 = n + " / " + js_ads[k][3] } else { n2 = n } let site_Locations = '<i class="fa fa-map-marker fa-fw"></i> ' + n2 + ""; let site_Image = '<img src="/images/no-image.png" width="90" alt="no-image">'; if (js_ads[k][17] !== "") { site_Image = js_ads[k][17] } let site_ID = siteid; let site_HREF = js_ads[k][13]; let site_Title = js_ads[k][12]; let site_Date = js_ads[k][6]; let site_Notify = js_ads[k][1]; let site_Hits = js_ads[k][4]; let site_Price = js_ads[k][14]; if (typeof js_ads[k][18] === "undefined") { site_Distance = 0 } else { site_Distance = js_ads[k][18] } html = '<div class="listItem clearfix hvr-bubble-bottom' + ct % 2 + '">'; html += '<a href="' + site_HREF + '" title="' + site_Title + '" class="reload">'; html += '<div class="rounded-bo clearfix">'; html += '<div class="rvn-item-image text-center" id="itm_img' + site_ID + '">' + site_Image + "</div>"; html += '<div class="rvn-item-content">'; html += site_AdVip; html += '<div class="rvn-item-no' + isOrange + '"><span class="badge">' + site_Notify + "</span></div>"; html += '<div class="rvn-item-title">' + site_Title + "</div>"; html += '<div class="rvn-item-loca" id="itm_loc' + site_ID + '">' + site_Locations + "</div>"; html += '<div class="rvn-item-date"><i class="fa fa-clock-o fa-fw"></i> ' + site_Date + '<span class="rvn-item-views"><i class="fa fa-eye fa-fw"></i> ' + site_Hits + "</span>" + "</div>"; html += '<div class="rvn-item-price"><i class="fa fa-money fa-fw"></i> GiÃ¡: ' + site_Price + "</div>"; if (site_Distance) { html += '<div class="rvn-item-geo"><i class="fa fa-street-view fa-fw"></i> Khoáº£ng cÃ¡ch: ' + site_Distance + "</div>" } html += "</div>"; html += "</div>"; html += "</a>"; html += "</div>"; if (k === adv_rnd) { ct++; html += '<div class="listItem clearfix hidden hvr-bubble-bottom' + ct % 2 + '" id="advtype12"></div>' } out += html } getbyid("SearchResults").innerHTML = out; showItemOptions(js_ads, false) } function chg_pgn(num_all, pg_limit, pg_no, func_name, pg_selector) { if (typeof func_name === "undefined") func_name = "load_pg"; if (typeof pg_selector === "undefined") pg_selector = "#PgCounter"; let num_view = 5; if (num_all <= pg_limit) { $(pg_selector).html(""); return "" } if (pg_no === 0) pg_no = 1; let num_pages = Math.floor(num_all / pg_limit); if (num_all % pg_limit !== 0) num_pages += 1; let from; let to; let out; let btag_a = ""; out = '<div class="PgCounter text-center clearfix"><span class="pg-stats">Trang ' + number_format(pg_no, 0, ".", ",") + " / " + number_format(num_pages, 0, ".", ",") + "</span>"; out += '<nav aria-label="Page navigation">'; out += '<ul class="pagination">'; if (pg_no === 1) { } else { from = 1; to = pg_limit; btag_a = '<a aria-label="First" title="' + from + " - " + to + '" href="javascript:{}" onclick="' + func_name + "(" + num_all + "," + pg_limit + "," + 1 + ')">'; out += '<li><span aria-hidden="true">' + btag_a + ".Â«</span></a></li>"; let pn = pg_no - 1; if (pn > 1) { from = (pn - 1) * pg_limit + 1; to = from + pg_limit - 1; btag_a = '<a aria-label="Previous" title="' + from + " - " + to + '" href="javascript:{}" onclick="' + func_name + "(" + num_all + "," + pg_limit + "," + pn + ')">'; out += "<li>" + btag_a + "Â«</a><li>" } } for (let i = 0; i < num_view; i++) { n = pg_no - Math.floor(num_view / 2) + i; if (n >= 1 && n <= num_pages) { let pn = n; from = (pn - 1) * pg_limit + 1; if (pn === num_pages) { to = from + num_all - (pn - 1) * pg_limit - 1 } else { to = from + pg_limit - 1 } if (n === pg_no) { out += '<li class="active"><a>' + number_format(pn, 0, ".", ",") + ' <span class="sr-only">(current)</span></a></li>' } else { btag_a = '<a title="' + from + " - " + to + '" href="javascript:{}" onclick="' + func_name + "(" + num_all + "," + pg_limit + "," + pn + ')">'; if (i > 3) { out += '<li class="hidden-sm hidden-xs">' + btag_a + number_format(pn, 0, ".", ",") + "</a><li>" } else { out += "<li>" + btag_a + number_format(pn, 0, ".", ",") + "</a><li>" } } } } if (pg_no >= num_pages) { } else { let pn = pg_no + 1; if (pn < num_pages) { from = (pn - 1) * pg_limit + 1; to = from + pg_limit - 1; btag_a = '<a aria-label="Next" title="' + from + " - " + to + '" href="javascript:{}" onclick="' + func_name + "(" + num_all + "," + pg_limit + "," + pn + ')">'; out += "<li>" + btag_a + "Â»</a><li>" } from = (num_pages - 1) * pg_limit; to = num_all; btag_a = '<a aria-label="Last" title="' + from + " - " + to + '" href="javascript:{}" onclick="' + func_name + "(" + num_all + "," + pg_limit + "," + num_pages + ')">'; out += '<li class="pg-last">' + btag_a + "Â».</a></li>" } out += "</ul></nav></div>"; $(pg_selector).html(out) } function update_catestats(catestats) { for (let i = 0; i < catestats.length; i++) { let c = catestats[i][0]; let n = catestats[i][1]; if (getbyid("substat" + c) !== null) getbyid("substat" + c).innerHTML = n } } function InView(element, margin) { if (!margin) margin = 0; let Top = GetTop(element), ScrollTop = GetScrollTop(); return !(Top < ScrollTop + margin || Top > ScrollTop + GetWindowHeight() - element.offsetHeight - margin) } function ScrollIntoView(element, bAlignTop, margin) { if (!margin) margin = 0; let posY = GetTop(element); if (bAlignTop) { posY -= margin } else { posY += element.offsetHeight + margin - GetWindowHeight() } const event = document.createEvent("Event"); event.initEvent("scroll", true, true); element.dispatchEvent(event); scrollTo(0, posY) } function GetWindowHeight() { return innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight || 0 } function GetScrollTop() { return pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0 } function GetTop(element) { let pos = 0; do { pos += element.offsetTop } while (element = element.offsetParent); return pos } tmrHash = 0; function CheckForHash() { if (document.location.hash) { let HashLocationName = document.location.hash; let HashNum = parseInt(HashLocationName.replace("#p", "")); if (isNaN(HashNum) || HashNum === pnum_all || HashNum === pclk) return; load_pg(pnum_all, plmt, HashNum) } } function RenameAnchor(anchorid, anchorname) { document.getElementById(anchorid).name = anchorname } function RedirectLocation(anchorid, anchorname, HashName) { RenameAnchor(anchorid, anchorname); document.location = HashName } let latestkid = 0; function select_home_category(kid) { latestkid = kid; $("#home_category").val(kid).trigger("chosen:updated") } function select_search_place(cityid) { $("#search_place").val(cityid).trigger("chosen:updated"); $("#locFilter").val(cityid).trigger("chosen:updated") } function set_locations_change() { $("#search_place").on("change", function () { let val = $("#search_place").val(); if (!val || parseInt(val) === 0) { window.location.href = "/Toan-quoc" } else { if (use_slug) window.location.href = "/khu-vuc/" + js_city[val][1]; else window.location.href = "/L" + val + "-" + js_city[val][1] } }); $("#locFilter").on("change", function () { let val = $(this).val(); let l; if (!val || parseInt(val) === 0) { l = "/Toan-quoc" } else { if (use_slug) l = "/khu-vuc/" + js_city[val][1]; else l = "/L" + val + "-" + js_city[val][1] } $("#frmLocationsFilter").attr("action", l); $("#frmLocationsFilter").submit() }) } function setOnResize() { $(window).resize(function () { }) } function sortObject(ObjArray, sort_order) { let data = Array(); for (let l in ObjArray) { data[data.length] = ObjArray[l] } return data.sort(function (a, b) { if (a[sort_order] < b[sort_order]) return -1; if (a[sort_order] > b[sort_order]) return 1; return 0 }) } function show_all_icons() { $("#cateicons div").removeClass("hidden") } function listSubLocations(select_id, loc_id, default_text, default_value) { let the_list = getbyid(select_id); the_list.options.length = 0; the_list.options[0] = new Option(default_text, default_value); let sub_loc = js_loc[loc_id]; if (sub_loc.length > 0) { the_list.disabled = false; for (let i = 0; i < sub_loc.length; i++) { let k = sub_loc[i][0]; n = sub_loc[i][3] + " " + sub_loc[i][1]; the_list.options[the_list.options.length] = new Option(n, k) } } } function select_list(the_value, the_list) { let list_obj = getbyid(the_list); let option_count = list_obj.options.length; for (let i = 0; i < option_count; i++) { if (the_value === list_obj.options[i].value) { list_obj.options[i].selected = true; break } } } function load_avatar(num_all, num_limit, pg_no) { $("#prloading").toggle(true); $("#sendreq").find('input[name="pg_no"]').val(pg_no); $.ajax({ url: $("#sendreq").attr("action"), type: "POST", data: $("#sendreq").serialize(), success: function (text) { $("#AvatarDiv").html(text); $("#prloading").toggle(false) } }) } function f5_scicode(hndId, ibgColor) { if (typeof hndId === "undefined" || !hndId) hndId = "scimage"; if (typeof ibgColor === "undefined" || !ibgColor) ibgColor = "white"; let d = new Date; let dt = d.getTime(); document.getElementById(hndId).innerHTML = '<img src="/scimage.php?bgcolor=' + ibgColor + "&amp;code=new&amp;time=" + dt + '" border="0" alt="" align="absmiddle" />' } function show_nav_paging() { } function cate_viewing(catid, subid) { const use_slug = true; if (catid) { let k = js_cate["root"][catid]; if (use_slug) { $("#view_cate").html('<a href="/danh-muc/' + k[2] + '">' + k[0] + "</a>") } else { $("#view_cate").html('<a href="/C-' + catid + "-" + k[2] + '">' + k[0] + "</a>") } if (subid && subid !== "*" && typeof js_cate["sub"][catid][subid] !== "undefined") { let l = js_cate["sub"][catid][subid]; if (use_slug) $("#view_subcate").html('<a href="/danh-muc/' + k[2] + "." + l[1] + '">' + l[0] + "</a>"); else $("#view_subcate").html('<a href="/C-' + catid + "-" + subid + "-" + k[2] + "-" + l[1] + '">' + l[0] + "</a>") } if (subid && subid !== "*") { $("#same_cate").attr("href", $("#view_subcate a").attr("href")) } else { $("#same_cate").attr("href", $("#view_cate a").attr("href")) } } } function mapDMS(lat, latm, lats, lng, lngm, lngs) { if (lat < 0) { latm = -latm; lats = -lats } if (lng < 0) { lngm = -lngm; lngs = -lngs } lat = lat + latm / 60 + lats / 3600; lng = lng + lngm / 60 + lngs / 3600; return [lat, lng] } function formatBytes(bytes, decimals) { if (bytes === 0) return "0 Byte"; let k = 1e3; let dm = decimals + 1 || 3; let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]; let i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i] } function getRandomInt(min, max) { min = Math.floor(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min } function b2a(a) { let c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = []; if (!a) return a; do { c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e, f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i) } while (k < a.length); return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3) } function a2b(a) { let b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length; for (b = 0; 64 > b; b++)e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b; for (c = 0; j > c; c++)for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;)((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d)); return h }
var $jscomp = $jscomp || {}; $jscomp.scope = {}; $jscomp.checkStringArgs = function (a, c, b) { if (null == a) throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined"); if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression"); return a + "" }; $jscomp.ASSUME_ES5 = !1; $jscomp.ASSUME_NO_NATIVE_MAP = !1; $jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) { a != Array.prototype && a != Object.prototype && (a[c] = b.value) }; $jscomp.getGlobal = function (a) { return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a }; $jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, c, b, d) { if (c) { b = $jscomp.global; a = a.split("."); for (d = 0; d < a.length - 1; d++) { var e = a[d]; e in b || (b[e] = {}); b = b[e] } a = a[a.length - 1]; d = b[a]; c = c(d); c != d && null != c && $jscomp.defineProperty(b, a, { configurable: !0, writable: !0, value: c }) } };
$jscomp.polyfill("String.prototype.repeat", function (a) { return a ? a : function (a) { var b = $jscomp.checkStringArgs(this, null, "repeat"); if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value"); a |= 0; for (var c = ""; a;)if (a & 1 && (c += b), a >>>= 1) b += b; return c } }, "es6", "es3"); var applicationServerPublicKey = "BFc7sUkscu_oO5IbgtjnZpbeYMdVXjk9cXV_S4HrHFwyPHzWpyak9riceaSVYIV7P5qKuSfb1UMcK955rrxabWc", isSubscribed = !1, swRegistration = null, strSubscription = !1;
function urlB64ToUint8Array(a) { var c = "=".repeat((4 - a.length % 4) % 4); a = (a + c).replace(/\-/g, "+").replace(/_/g, "/"); a = a2b(a); c = new Uint8Array(a.length); for (var b = 0; b < a.length; ++b)c[b] = a.charCodeAt(b); return c } function get_userid() { return "undefined" !== typeof valid_user ? valid_user.userid : "" }
function updateSubscriptionOnServer(a, c) { if (a) { var b = new FormData; b.append("subscription", JSON.stringify(a)); b.append("session_id", session_id); b.append("userAgent", navigator.userAgent); b.append("userid", get_userid()); b.append("mode", c); strSubscription = JSON.stringify(a); fetch("/ajax-webpush.php", { method: "POST", body: b }).then(function (a) { return a.json() }).then(function (a) { "" !== a.result && sessionStorage.setItem("webpush", a.result) }) } }
function subscribeUser() { var a = urlB64ToUint8Array(applicationServerPublicKey); swRegistration.pushManager.subscribe({ userVisibleOnly: !0, applicationServerKey: a }).then(function (a) { console.log("User is subscribed."); updateSubscriptionOnServer(a, "subscribe"); isSubscribed = !0 }) }
function initSubscription() { "denied" === Notification.permission ? console.warn("Push Messaging Blocked.") : (document.getElementById("btnNotification").addEventListener("click", function () { isSubscribed || subscribeUser() }), swRegistration.pushManager.getSubscription().then(function (a) { (isSubscribed = null !== a) ? null === sessionStorage.getItem("webpush") && updateSubscriptionOnServer(a, "update") : showAllowNotification() })) }
window.addEventListener("load", function () { "serviceWorker" in navigator && null === sessionStorage.getItem("sw") && navigator.serviceWorker.register("/pwa-sw.min.js", { scope: "./" }).then(function (a) { swRegistration = a; sessionStorage.setItem("sw", 1); console.log("Service worker has been registered for scope: " + a.scope) }) });

let manUpObject; let tagArray = [], linkArray = []; let validMetaValues = [{ name: "mobile-web-app-capable", manifestName: "display" }, { name: "apple-mobile-web-app-capable", manifestName: "display" }, { name: "apple-mobile-web-app-title", manifestName: "short_name" }, { name: "application-name", manifestName: "short_name" }, { name: "msapplication-TileColor", manifestName: "ms_TileColor" }, { name: "msapplication-square70x70logo", manifestName: "icons", imageSize: "70x70" }, { name: "msapplication-square150x150logo", manifestName: "icons", imageSize: "150x150" }, { name: "msapplication-wide310x150logo", manifestName: "icons", imageSize: "310x150" }, { name: "msapplication-square310x310logo", manifestName: "icons", imageSize: "310x310" }]; let validLinkValues = [{ name: "apple-touch-icon", manifestName: "icons", imageSize: "152x152" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "120x120" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "76x76" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "60x60" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "57x57" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "72x72" }, { name: "apple-touch-icon", manifestName: "icons", imageSize: "114x114" }, { name: "icon", manifestName: "icons", imageSize: "128x128" }, { name: "icon", manifestName: "icons", imageSize: "192x192" }]; let generateFullMetaData = function () { for (let i = 0; i < validMetaValues.length; i++) { if (manUpObject[validMetaValues[i].manifestName]) { if (validMetaValues[i].manifestName === "icons") { let imageArray = manUpObject.icons; for (let j = 0; j < imageArray.length; j++) { if (imageArray[j].sizes === validMetaValues[i].imageSize) { validMetaValues[i].content = imageArray[j].src } } } else { validMetaValues[i].content = manUpObject[validMetaValues[i].manifestName]; if (validMetaValues[i].manifestName === "display" && manUpObject.display === "standalone") { validMetaValues[i].content = "yes" } } } } return validMetaValues }; let generateFullLinkData = function () { for (let i = 0; i < validLinkValues.length; i++) { if (manUpObject[validLinkValues[i].manifestName]) { if (validLinkValues[i].manifestName === "icons") { let imageArray = manUpObject.icons; for (let j = 0; j < imageArray.length; j++) { if (imageArray[j].sizes === validLinkValues[i].imageSize) { validLinkValues[i].content = imageArray[j].src } } } else { validLinkValues[i].content = manUpObject[validLinkValues[i].manifestName] } } } return validLinkValues }; let generateMetaArray = function () { let tempMetaArray = generateFullMetaData(); let headTarget = document.getElementsByTagName("head")[0]; for (let i = 0; i < tempMetaArray.length; i++) { let metaTag = document.createElement("meta"); metaTag.name = tempMetaArray[i].name; metaTag.content = tempMetaArray[i].content; headTarget.appendChild(metaTag) } }; let generateLinkArray = function () { let tempLinkArray = generateFullLinkData(); let headTarget = document.getElementsByTagName("head")[0]; for (let i = 0; i < tempLinkArray.length; i++) { let linkTag = document.createElement("link"); linkTag.setAttribute("rel", tempLinkArray[i].name); linkTag.setAttribute("sizes", tempLinkArray[i].imageSize); linkTag.setAttribute("href", tempLinkArray[i].content); headTarget.appendChild(linkTag) } }; let generateObj = function (a) { manUpObject = JSON.parse(a); generateLinkArray(); generateMetaArray() }; let makeAjax = function (a) { if (!window.XMLHttpRequest) { return } let fullURL; let pat = /^https?:\/\//i; pat.test(a) ? fulURL = a : fullURL = window.location.hostname + a; let ajax = new XMLHttpRequest(); ajax.onreadystatechange = function () { if (ajax.readyState === 4 && ajax.status === 200) { generateObj(ajax.responseText) } }; ajax.open("GET", a, true); ajax.send() }; let collectManifestObj = function () { let links = document.getElementsByTagName("link"); for (let i = 0; i < links.length; i++) { if (links[i].rel && links[i].rel === "manifest") { makeAjax(links[i].href) } } }; let testForManifest = function () { collectManifestObj() }();
var js_cate = new Array();
js_cate = {
    "root": {
        "11": ["Nhà cửa - Đất đai", "177025", "Nha-cua-Dat-dai", 10, "fa fa-home"],
        "75": ["Việc làm - Tuyển sinh", "12313", "Viec-lam-Tuyen-sinh", 7, "fa fa-users"],
        "73": ["Cơ khí - Máy móc", "29154", "Co-khi-May-moc", 6, "fa fa-cogs"],
        "2": ["Điện máy - Điện tử", "17021", "Dien-may-Dien-tu", 8, "fa fa-television"],
        "77": ["Thời trang - Làm đẹp", "6996", "Thoi-trang-Lam-dep", 6, "fa fa-shopping-bag"],
        "78": ["Đời sống - Xã hội", "5477", "Doi-song-Xa-hoi", 20, "fa fa-smile-o"],
        "76": ["Ô tô - Xe máy", "14911", "O-to-Xe-may", 6, "fa fa-car"],
        "10": ["Máy tính - Linh kiện", "9200", "May-tinh-Linh-kien", 5, "fa fa-laptop"],
        "9": ["Dịch vụ", "8352", "Dich-vu", 7, "fa fa-whatsapp"],
        "74": ["Kinh doanh", "18132", "Kinh-doanh", 5, "fa fa-balance-scale"],
        "82": ["Hàng hóa - Vật liệu", "15323", "Hang-hoa-Vat-lieu", 8, "fa fa-tags"],
        "98": ["Công nghệ thông tin", "2917", "Cong-nghe-thong-tin", 8, "fa fa-globe"],
        "3": ["Điện thoại - Phụ kiện", "7199", "Dien-thoai-Phu-kien", 4, "fa fa-mobile"],
        "84": ["Mỹ thuật - Thiết kế", "7993", "My-thuat-Thiet-ke", 5, "fa fa-paint-brush"],
        "1": ["Ẩm thực - Thực phẩm", "3008", "Am-thuc-Thuc-pham", 3, "fa fa-cutlery"]
    },
    "sub": {
        "11": {
            "85": ["Mua nhà, bán nhà", "Mua-nha--ban-nha", "85", 0],
            "51": ["Thuê và cho thuê nhà", "Thue-va-cho-thue-nha", "51", 1],
            "83": ["Mua đất, bán đất", "Mua-dat--ban-dat", "83", 2],
            "126": ["Vật liệu xây dựng", "Vat-lieu-xay-dung", "126", 3],
            "127": ["Thi công xây dựng", "Thi-cong-xay-dung", "127", 4],
            "67": ["Sang nhượng QSD", "Sang-nhuong-QSD", "67", 5],
            "134": ["Nội Thất", "Noi-That", "134", 6],
            "135": ["Ngoại thất", "Ngoai-that", "135", 7],
            "136": ["Kiến trúc", "Kien-truc", "136", 8],
            "19": ["Các loại khác", "Cac-loai-khac", "19", 9]
        },
        "75": {
            "13": ["Việc tìm người", "Viec-tim-nguoi", "13", 0],
            "139": ["Tuyển sinh", "Tuyen-sinh", "139", 1],
            "96": ["Dạy kèm", "Day-kem", "96", 2],
            "6": ["Học hành", "Hoc-hanh", "6", 3],
            "52": ["Người tìm việc", "Nguoi-tim-viec", "52", 4],
            "62": ["Giáo dục, đào tạo", "Giao-duc--dao-tao", "62", 5],
            "143": ["Dịch vụ lao động", "Dich-vu-lao-dong", "143", 6]
        },
        "73": {
            "113": ["Thiết bị sản xuất", "Thiet-bi-san-xuat", "113", 0],
            "53": ["Thiết bị văn phòng", "Thiet-bi-van-phong", "53", 1],
            "60": ["Thiết bị bảo an, bảo vệ", "Thiet-bi-bao-an--bao-ve", "60", 2],
            "94": ["Cơ khí", "Co-khi", "94", 3],
            "95": ["Điện lạnh", "Dien-lanh", "95", 4],
            "28": ["Kỹ thuật, ứng dụng", "Ky-thuat--ung-dung", "28", 5]
        },
        "2": {
            "133": ["Điện tử", "Dien-tu", "133", 0],
            "132": ["Điện gia dụng", "Dien-gia-dung", "132", 1],
            "131": ["Điện lạnh", "Dien-lanh", "131", 2],
            "92": ["Thiết bị số khác", "Thiet-bi-so-khac", "92", 3],
            "117": ["Thiết bị trình chiếu", "Thiet-bi-trinh-chieu", "117", 4],
            "114": ["Máy nghe nhạc", "May-nghe-nhac", "114", 5],
            "115": ["Máy ảnh số", "May-anh-so", "115", 6],
            "124": ["Máy chơi game", "May-choi-game", "124", 7]
        },
        "77": {
            "32": ["Quần áo, thời trang", "Quan-ao--thoi-trang", "32", 0],
            "66": ["Mỹ phẩm", "My-pham", "66", 1],
            "137": ["Giày dép", "Giay-dep", "137", 2],
            "91": ["Đồng hồ, mắt kính", "Dong-ho--mat-kinh", "91", 3],
            "88": ["Trang sức", "Trang-suc", "88", 4],
            "138": ["Khác", "Khac", "138", 5]
        },
        "78": {
            "105": ["Trong nước", "Trong-nuoc", "105", 0],
            "107": ["Văn phòng luật", "Van-phong-luat", "107", 1],
            "97": ["Đồ chơi", "Do-choi", "97", 2],
            "68": ["Gift shop", "Gift-shop", "68", 3],
            "106": ["Ngoài nước", "Ngoai-nuoc", "106", 4],
            "18": ["Thông báo, nhận tin", "Thong-bao--nhan-tin", "18", 5],
            "71": ["Cá kiểng, cây cảnh", "Ca-kieng--cay-canh", "71", 6],
            "55": ["Sách, truyện, báo", "Sach--truyen--bao", "55", 7],
            "29": ["Ngữ văn, dịch thuật", "Ngu-van--dich-thuat", "29", 8],
            "17": ["Kết bạn, tìm người", "Ket-ban--tim-nguoi", "17", 9],
            "50": ["Hoa tươi", "Hoa-tuoi", "50", 10],
            "93": ["CD, DVD, phim ảnh", "CD--DVD--phim-anh", "93", 11],
            "104": ["Rơi giấy tờ", "Roi-giay-to", "104", 12],
            "27": ["Y khoa, y tế", "Y-khoa--y-te", "27", 13],
            "33": ["Luật", "Luat", "33", 14],
            "34": ["Thông tin, quảng cáo", "Thong-tin--quang-cao", "34", 15],
            "36": ["Games", "Games", "36", 16],
            "37": ["Thể dục, thể thao", "The-duc--the-thao", "37", 17],
            "44": ["Văn phòng phẩm", "Van-phong-pham", "44", 18],
            "72": ["Thú nuôi, vật nuôi", "Thu-nuoi--vat-nuoi", "72", 19]
        },
        "76": {
            "58": ["Ô tô", "O-to", "58", 0],
            "140": ["Xe tải", "Xe-tai", "140", 1],
            "63": ["Nội thất, đồ chơi Ô tô", "Noi-that--do-choi-O-to", "63", 2],
            "59": ["Xe máy", "Xe-may", "59", 3],
            "129": ["Xem đạp điện", "Xem-dap-dien", "129", 4],
            "119": ["Mũ bảo hiểm xe máy", "Mu-bao-hiem-xe-may", "119", 5]
        },
        "10": {
            "56": ["Laptop, Notebook", "Laptop--Notebook", "56", 0],
            "118": ["Máy in, mực in", "May-in--muc-in", "118", 1],
            "90": ["Máy bộ, Desktop PC", "May-bo--Desktop-PC", "90", 2],
            "89": ["Hàng thanh lý", "Hang-thanh-ly", "89", 3],
            "109": ["Thiết bị Mạng", "Thiet-bi-Mang", "109", 4]
        },
        "9": {
            "101": ["Tổ chức sự kiện", "To-chuc-su-kien", "101", 0],
            "108": ["Dịch vụ vận chuyển", "Dich-vu-van-chuyen", "108", 1],
            "46": ["Dịch vụ chuyển phát", "Dich-vu-chuyen-phat", "46", 2],
            "120": ["An ninh, bảo vệ", "An-ninh--bao-ve", "120", 3],
            "5": ["Du lịch", "Du-lich", "5", 4],
            "12": ["Sửa chữa, bảo trì", "Sua-chua--bao-tri", "12", 5],
            "26": ["Vận tải, vận chuyển", "Van-tai--van-chuyen", "26", 6]
        },
        "74": {
            "7": ["Hợp tác, cộng tác", "Hop-tac--cong-tac", "7", 0],
            "4": ["Doanh nghiệp", "Doanh-nghiep", "4", 1],
            "24": ["Mua bán qua mạng", "Mua-ban-qua-mang", "24", 2],
            "48": ["Chứng khoán, cổ phiếu", "Chung-khoan--co-phieu", "48", 3],
            "69": ["Tài chính, kế toán", "Tai-chinh--ke-toan", "69", 4]
        },
        "82": {
            "54": ["Hàng hóa, vật liệu", "Hang-hoa--vat-lieu", "54", 0],
            "8": ["Thanh lý, khuyến mãi", "Thanh-ly--khuyen-mai", "8", 1],
            "49": ["Nông, lâm, thủy sản", "Nong--lam--thuy-san", "49", 2],
            "100": ["Đồ gỗ cao cấp", "Do-go-cao-cap", "100", 3],
            "103": ["Vàng bạc, đá quý", "Vang-bac--da-quy", "103", 4],
            "45": ["Đồ cổ, hàng hiếm", "Do-co--hang-hiem", "45", 5],
            "61": ["Dệt may, vải sợi", "Det-may--vai-soi", "61", 6],
            "125": ["Hóa chất, sinh học", "Hoa-chat--sinh-hoc", "125", 7]
        },
        "98": {
            "22": ["Phần mềm", "Phan-mem", "22", 0],
            "40": ["Giới thiệu Website", "Gioi-thieu-Website", "40", 1],
            "102": ["Dịch vụ tin học", "Dich-vu-tin-hoc", "102", 2],
            "25": ["Viễn thông", "Vien-thong", "25", 3],
            "86": ["Điện thoại VoIP", "Dien-thoai-VoIP", "86", 4],
            "15": ["Internet", "Internet", "15", 5],
            "35": ["Domain, Web, Hosting", "Domain--Web--Hosting", "35", 6],
            "87": ["Dịch vụ khác", "Dich-vu-khac", "87", 7]
        },
        "3": {
            "81": ["Điện thoại di động", "Dien-thoai-di-dong", "81", 0],
            "130": ["Linh kiện", "Linh-kien", "130", 1],
            "38": ["Sim, card, thẻ", "Sim--card--the", "38", 2],
            "128": ["Phần mềm ĐTDĐ", "Phan-mem-DTDD", "128", 3]
        },
        "84": {
            "65": ["In ấn, thiết kế", "In-an--thiet-ke", "65", 0],
            "123": ["Trang trí nội thất", "Trang-tri-noi-that", "123", 1],
            "116": ["Tranh ảnh nghệ thuật", "Tranh-anh-nghe-thuat", "116", 2],
            "21": ["Mỹ thuật, kiến trúc", "My-thuat--kien-truc", "21", 3],
            "41": ["Thủ công, mỹ nghệ", "Thu-cong--my-nghe", "41", 4]
        },
        "1": {
            "112": ["Thực phẩm dinh dưỡng", "Thuc-pham-dinh-duong", "112", 0],
            "99": ["Tiệc cưới", "Tiec-cuoi", "99", 1],
            "57": ["Ẩm thực khác", "Am-thuc-khac", "57", 2]
        }
    }
};

var js_city = new Object();
js_city[1] = ['Hà Nội', 'Ha-Noi'];
js_city[11] = ['Hồ Chí Minh', 'Ho-Chi-Minh'];
js_city[250] = ['Bình Dương', 'Binh-Duong'];
js_city[53] = ['Hải Phòng', 'Hai-Phong'];
js_city[2] = ['Huế', 'Hue'];
js_city[210] = ['Cần Thơ', 'Can-Tho'];
js_city[4] = ['Đà Nẵng', 'Da-Nang'];
js_city[14] = ['Khánh Hòa', 'Khanh-Hoa'];
js_city[195] = ['An Giang', 'An-Giang'];
js_city[233] = ['Bình Phước', 'Binh-Phuoc'];
js_city[238] = ['Bình Định', 'Binh-Dinh'];
js_city[9] = ['Bình Thuận', 'Binh-Thuan'];
js_city[228] = ['Bạc Liêu', 'Bac-Lieu'];
js_city[6] = ['Phú Yên', 'Phu-Yen'];
js_city[268] = ['Bắc Giang', 'Bac-Giang'];
js_city[260] = ['Bắc Ninh', 'Bac-Ninh'];
js_city[254] = ['Bến Tre', 'Ben-Tre'];
js_city[269] = ['Bắc Kạn', 'Bac-Kan'];
js_city[523] = ['Cao Bằng', 'Cao-Bang'];
js_city[192] = ['Cà Mau', 'Ca-Mau'];
js_city[181] = ['Đắk Lắk', 'Dak-Lak'];
js_city[784] = ['Đắk Nông', 'Dak-Nong'];
js_city[216] = ['Đồng Nai', 'Dong-Nai'];
js_city[71] = ['Đồng Tháp', 'Dong-Thap'];
js_city[792] = ['Điện Biên', 'Dien-Bien'];
js_city[72] = ['Gia Lai', 'Gia-Lai'];
js_city[62] = ['Hà Nam', 'Ha-Nam'];
js_city[158] = ['Hà Tĩnh', 'Ha-Tinh'];
js_city[111] = ['Hòa Bình', 'Hoa-Binh'];
js_city[121] = ['Hưng Yên', 'Hung-Yen'];
js_city[156] = ['Kiên Giang', 'Kien-Giang'];
js_city[116] = ['Kon Tum', 'Kon-Tum'];
js_city[160] = ['Lai Châu', 'Lai-Chau'];
js_city[205] = ['Lâm Đồng', 'Lam-Dong'];
js_city[226] = ['Lạng Sơn', 'Lang-Son'];
js_city[128] = ['Lào Cai', 'Lao-Cai'];
js_city[231] = ['Long An', 'Long-An'];
js_city[218] = ['Nam Định', 'Nam-Dinh'];
js_city[300] = ['Nghệ An', 'Nghe-An'];
js_city[129] = ['Ninh Bình', 'Ninh-Binh'];
js_city[302] = ['Ninh Thuận', 'Ninh-Thuan'];
js_city[180] = ['Phú Thọ', 'Phu-Tho'];
js_city[39] = ['Quảng Bình', 'Quang-Binh'];
js_city[154] = ['Quảng Ngãi', 'Quang-Ngai'];
js_city[46] = ['Quảng Ninh', 'Quang-Ninh'];
js_city[206] = ['Quảng Trị', 'Quang-Tri'];
js_city[45] = ['Sóc Trăng', 'Soc-Trang'];
js_city[31] = ['Sơn La', 'Son-La'];
js_city[57] = ['Tây Ninh', 'Tay-Ninh'];
js_city[219] = ['Thái Bình', 'Thai-Binh'];
js_city[54] = ['Thái Nguyên', 'Thai-Nguyen'];
js_city[129] = ['Thanh Hóa', 'Thanh-Hoa'];
js_city[37] = ['Thừa Thiên Huế', 'Thua-Thien-Hue'];
js_city[174] = ['Tiền Giang', 'Tien-Giang'];
js_city[25] = ['Trà Vinh', 'Tra-Vinh'];
js_city[160] = ['Tuyên Quang', 'Tuyen-Quang'];
js_city[26] = ['Vĩnh Long', 'Vinh-Long'];


var js_district = new Array();
js_district = {
    "1": ["Quận Ba Đình", "1"],
    "2": ["Quận Hoàn Kiếm", "1"],
    "3": ["Quận Tây Hồ", "1"],
    "4": ["Quận Long Biên", "1"],
    "5": ["Quận Cầu Giấy", "1"],
    "6": ["Quận Đống Đa", "1"],
    "7": ["Quận Hai Bà Trưng", "1"],
    "8": ["Quận Hoàng Mai", "1"],
    "9": ["Quận Thanh Xuân", "1"],
    "16": ["Huyện Sóc Sơn", "1"],
    "17": ["Huyện Đông Anh", "1"],
    "18": ["Huyện Gia Lâm", "1"],
    "19": ["Quận Bắc Từ Liêm", "1"],
    "20": ["Huyện Thanh Trì", "1"],
    "24": ["Thị Xã Hà Giang", "77"],
    "26": ["Huyện Đồng Văn", "77"],
    "27": ["Huyện Mèo Vạc", "77"],
    "28": ["Huyện Yên Minh", "77"],
    "29": ["Huyện Quản Bạ", "77"],
    "30": ["Huyện Vị Xuyên", "77"],
    "31": ["Huyện Bắc Mê", "77"],
    "32": ["Huyện Hoàng Su Phì", "77"],
    "33": ["Huyện Xín Mần", "77"],
    "34": ["Huyện Bắc Quang", "77"],
    "35": ["Huyện Quang Bình", "77"],
    "40": ["Thị Xã Cao Bằng", "523"],
    "42": ["Huyện Bảo Lâm", "523"],
    "43": ["Huyện Bảo Lạc", "523"],
    "44": ["Huyện Thông Nông", "523"],
    "45": ["Huyện Hạ Quảng", "523"],
    "46": ["Huyện Trùng Khánh", "523"],
    "47": ["Huyện Hạ Lang", "523"],
    "48": ["Huyện Quảng Uyên", "523"],
    "49": ["Huyện Phục Hòa", "523"],
    "50": ["Huyện Hoà An", "523"],
    "51": ["Huyện Nguyễn Bính", "523"],
    "52": ["Huyện Thạch An", "523"],
    "58": ["Thị Xã Bắc Kạn", "269"],
    "60": ["Huyện Pác Nặm", "269"],
    "61": ["Huyện Ba Bể", "269"],
    "62": ["Huyện Ngân Sơn", "269"],
    "63": ["Huyện Bạch Thông", "269"],
    "64": ["Huyện Chợ Đồn", "269"],
    "65": ["Huyện Chợ Mới", "269"],
    "66": ["Huyện Na Rì", "269"],
    "70": ["Thị Xã Tuyên Quang", "314"],
    "72": ["Huyện Na Hang", "314"],
    "73": ["Huyện Chiêm Hóa", "314"],
    "74": ["Huyện Hàm Yên", "314"],
    "75": ["Huyện Yên Sơn", "314"],
    "76": ["Huyện Sơn Dương", "314"],
    "80": ["Thành Phố Lào Cai", "162"],
    "82": ["Huyện Bát Xát", "162"],
    "83": ["Huyện Mường Khương", "162"],
    "84": ["Huyện Si Ma Cai", "162"],
    "85": ["Huyện Bắc Hà", "162"],
    "86": ["Huyện Bảo Thắng", "162"],
    "87": ["Huyện Bảo Yên", "162"],
    "88": ["Huyện Sa Pa", "162"],
    "89": ["Huyện Văn Bàn", "162"],
    "94": ["Thành Phố Điện Biên Phủ", "792"],
    "95": ["Thị Xã Mường Lay", "792"],
    "96": ["Huyện Mường Nhé", "792"],
    "97": ["Huyện Mường Chà", "792"],
    "98": ["Huyện Tủa Chùa", "792"],
    "99": ["Huyện Tuần Giáo", "792"],
    "100": ["Huyện Điện Biên", "792"],
    "101": ["Huyện Điện Biên Đông", "792"],
    "102": ["Huyện Mường Áng", "792"],
    "104": ["Thị Xã Lai Châu", "175"],
    "106": ["Huyện Tam Đường", "175"],
    "107": ["Huyện Mường Tè", "175"],
    "108": ["Huyện Sìn Hồ", "175"],
    "109": ["Huyện Phong Thổ", "175"],
    "110": ["Huyện Than Uyên", "175"],
    "111": ["Huyện Tân Uyên", "175"],
    "116": ["Thành Phố Sơn La", "501"],
    "118": ["Huyện Quỳnh Nhai", "501"],
    "119": ["Huyện Thuận Châu", "501"],
    "120": ["Huyện Mường La", "501"],
    "121": ["Huyện Bắc Yên", "501"],
    "122": ["Huyện Phù Yên", "501"],
    "123": ["Huyện Mộc Châu", "501"],
    "124": ["Huyện Yên Châu", "501"],
    "125": ["Huyện Mai Sơn", "501"],
    "126": ["Huyện Sông Mã", "501"],
    "127": ["Huyện Sập Cộp", "501"],
    "132": ["Thành Phố Yên Bái", "323"],
    "133": ["Thị Xã Nghĩa Lộ", "323"],
    "135": ["Huyện Lục Yên", "323"],
    "136": ["Huyện Văn Yên", "323"],
    "137": ["Huyện Mù Cang Chải", "323"],
    "138": ["Huyện Trấn Yên", "323"],
    "139": ["Huyện Trạm Tấu", "323"],
    "140": ["Huyện Văn Chấn", "323"],
    "141": ["Huyện Yên Bình", "323"],
    "148": ["Thành Phố Hòa Bình", "130"],
    "150": ["Huyện Đà Bắc", "130"]
}

var catOptionsJS = new Object();
catOptionsJS['opt'] = { "3": ["select", "<div class=\"form-group\"><div>Lo\u1ea1i h\u00ecnh l\u00e0m vi\u1ec7c<\/div><div class=\"text-right\"><select class='chosen-select form-control' id='opt_field_3' name='opt_field_3'><label><option value='To\u00e0n th\u1eddi gian c\u1ed1 \u0111\u1ecbnh'>To\u00e0n th\u1eddi gian c\u1ed1 \u0111\u1ecbnh<\/option><\/label><label><option value='To\u00e0n th\u1eddi gian t\u1ea1m th\u1eddi'>To\u00e0n th\u1eddi gian t\u1ea1m th\u1eddi<\/option><\/label><label><option value='B\u00e1n th\u1eddi gian c\u1ed1 \u0111\u1ecbnh'>B\u00e1n th\u1eddi gian c\u1ed1 \u0111\u1ecbnh<\/option><\/label><label><option value='B\u00e1n th\u1eddi gian t\u1ea1m th\u1eddi'>B\u00e1n th\u1eddi gian t\u1ea1m th\u1eddi<\/option><\/label><label><option value='C\u1ed9ng t\u00e1c vi\u00ean'>C\u1ed9ng t\u00e1c vi\u00ean<\/option><\/label><label><option value='L\u00e0m vi\u1ec7c t\u1eeb xa'>L\u00e0m vi\u1ec7c t\u1eeb xa<\/option><\/label><label><option value='Kh\u00e1c' selected>Kh\u00e1c<\/option><\/label><\/select><\/div><\/div>"], "13": ["text", "<div class=\"form-group\"><div>Tu\u1ed5i<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_13' name='opt_field_13' \/><\/div><\/div>"], "14": ["text", "<div class=\"form-group\"><div>Gi\u1edbi t\u00ednh<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_14' name='opt_field_14' \/><\/div><\/div>"], "15": ["text", "<div class=\"form-group\"><div>B\u1eb1ng c\u1ea5p<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_15' name='opt_field_15' \/><\/div><\/div>"], "16": ["text", "<div class=\"form-group\"><div>Ngo\u1ea1i ng\u1eef<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_16' name='opt_field_16' \/><\/div><\/div>"], "17": ["text", "<div class=\"form-group\"><div>V\u1ecb tr\u00ed<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_17' name='opt_field_17' \/><\/div><\/div>"], "1": ["select", "<div class=\"form-group\"><div>Ngh\u1ec1 nghi\u1ec7p<\/div><div class=\"text-right\"><select class='chosen-select form-control' id='opt_field_1' name='opt_field_1'><label><option value='An ninh, b\u1ea3o v\u1ec7'>An ninh, b\u1ea3o v\u1ec7<\/option><\/label><label><option value='B\u00e1n h\u00e0ng'>B\u00e1n h\u00e0ng<\/option><\/label><label><option value='B\u1ebfp, pha ch\u1ebf'>B\u1ebfp, pha ch\u1ebf<\/option><\/label><label><option value='C\u1eaft t\u00f3c, g\u1ed9i \u0111\u1ea7u, l\u00e0m m\u00f3ng'>C\u1eaft t\u00f3c, g\u1ed9i \u0111\u1ea7u, l\u00e0m m\u00f3ng<\/option><\/label><label><option value='Gi\u00e1m \u0111\u1ed1c, Qu\u1ea3n l\u00fd, Tr\u01b0\u1edfng ph\u00f2ng'>Gi\u00e1m \u0111\u1ed1c, Qu\u1ea3n l\u00fd, Tr\u01b0\u1edfng ph\u00f2ng<\/option><\/label><label><option value='Giao ch\u1edf h\u00e0ng'>Giao ch\u1edf h\u00e0ng<\/option><\/label><label><option value='Gi\u00e1o vi\u00ean, gia s\u01b0'>Gi\u00e1o vi\u00ean, gia s\u01b0<\/option><\/label><label><option value='K\u1ebf to\u00e1n, thu ng\u00e2n'>K\u1ebf to\u00e1n, thu ng\u00e2n<\/option><\/label><label><option value='Kinh doanh'>Kinh doanh<\/option><\/label><label><option value='K\u1ef9 s\u01b0 \u0111i\u1ec7n, \u0111i\u1ec7n t\u1eed, C\u00f4ng ngh\u1ec7 th\u00f4ng tin'>K\u1ef9 s\u01b0 \u0111i\u1ec7n, \u0111i\u1ec7n t\u1eed, C\u00f4ng ngh\u1ec7 th\u00f4ng tin<\/option><\/label><label><option value='K\u1ef9 s\u01b0 X\u00e2y d\u1ef1ng, C\u01a1 kh\u00ed, M\u1ef9 thu\u1eadt, In'>K\u1ef9 s\u01b0 X\u00e2y d\u1ef1ng, C\u01a1 kh\u00ed, M\u1ef9 thu\u1eadt, In<\/option><\/label><label><option value='L\u00e1i xe, ph\u1ee5 xe'>L\u00e1i xe, ph\u1ee5 xe<\/option><\/label><label><option value='Lao \u0111\u1ed9ng ph\u1ed5 th\u00f4ng kh\u00e1c'>Lao \u0111\u1ed9ng ph\u1ed5 th\u00f4ng kh\u00e1c<\/option><\/label><label><option value='Massage, Th\u1ea9m m\u1ef9'>Massage, Th\u1ea9m m\u1ef9<\/option><\/label><label><option value='May m\u1eb7c, gi\u1ea7y da'>May m\u1eb7c, gi\u1ea7y da<\/option><\/label><label><option value='NV V\u0103n ph\u00f2ng, h\u00e0nh ch\u00ednh, nh\u00e2n s\u1ef1'>NV V\u0103n ph\u00f2ng, h\u00e0nh ch\u00ednh, nh\u00e2n s\u1ef1<\/option><\/label><label><option value='Ng\u01b0\u1eddi gi\u00fap vi\u1ec7c, t\u1ea1p v\u1ee5'>Ng\u01b0\u1eddi gi\u00fap vi\u1ec7c, t\u1ea1p v\u1ee5<\/option><\/label><label><option value='Nh\u00e2n vi\u00ean Nh\u00e0 h\u00e0ng, kh\u00e1ch s\u1ea1n, qu\u00e1n'>Nh\u00e2n vi\u00ean Nh\u00e0 h\u00e0ng, kh\u00e1ch s\u1ea1n, qu\u00e1n<\/option><\/label><label><option value='Tuy\u1ec3n Ng\u00e0nh ngh\u1ec1 kh\u00e1c'>Tuy\u1ec3n Ng\u00e0nh ngh\u1ec1 kh\u00e1c<\/option><\/label><label><option value='T\u01b0 v\u1ea5n, Ch\u0103m s\u00f3c kh\u00e1ch h\u00e0ng'>T\u01b0 v\u1ea5n, Ch\u0103m s\u00f3c kh\u00e1ch h\u00e0ng<\/option><\/label><label><option value='Th\u1ee3 m\u1ed9c, \u0111i\u1ec7n, x\u00e2y d\u1ef1ng, c\u01a1 kh\u00ed'>Th\u1ee3 m\u1ed9c, \u0111i\u1ec7n, x\u00e2y d\u1ef1ng, c\u01a1 kh\u00ed<\/option><\/label><label><option value='Vi\u1ec7c l\u00e0m b\u00e1n th\u1eddi gian'>Vi\u1ec7c l\u00e0m b\u00e1n th\u1eddi gian<\/option><\/label><label><option value='Y d\u01b0\u1ee3c' selected>Y d\u01b0\u1ee3c<\/option><\/label><\/select><\/div><\/div>"], "18": ["text", "<div class=\"form-group\"><div>Kinh nghi\u1ec7m<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_18' name='opt_field_18' \/><\/div><\/div>"], "6": ["text", "<div class=\"form-group\"><div>M\u1ee9c l\u01b0\u01a1ng<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_6' name='opt_field_6' \/><\/div><\/div>"], "4": ["select", "<div class=\"form-group\"><div>Lo\u1ea1i b\u1ea5t \u0111\u1ed9ng s\u1ea3n<\/div><div class=\"text-right\"><select class='chosen-select form-control' id='opt_field_4' name='opt_field_4'><label><option value='btvl'>Bi\u1ec7t th\u1ef1, Villa, Penthouse<\/option><\/label><label><option value='ncc'>Nh\u00e0 ch\u01b0ng c\u01b0, t\u1eadp th\u1ec3<\/option><\/label><label><option value='nmt'>Nh\u00e0 m\u1eb7t ti\u1ec1n, m\u1eb7t ph\u1ed1<\/option><\/label><label><option value='nhn'>Nh\u00e0 h\u1ebbm, ng\u1ecf nh\u1ecf<\/option><\/label><\/select><\/div><\/div>"], "8": ["text", "<div class=\"form-group\"><div>\u0110\u1ecba ch\u1ec9<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_8' name='opt_field_8' \/><\/div><\/div>"], "5": ["text", "<div class=\"form-group\"><div>T\u00ean d\u1ef1 \u00e1n<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_5' name='opt_field_5' \/><\/div><\/div>"], "9": ["text", "<div class=\"form-group\"><div>Di\u1ec7n t\u00edch \u0111\u1ea5t<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_9' name='opt_field_9' \/><\/div><\/div>"], "10": ["text", "<div class=\"form-group\"><div>T\u1ea7ng\/L\u1ea7u<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_10' name='opt_field_10' \/><\/div><\/div>"], "23": ["text", "<div class=\"form-group\"><div>Ph\u00f2ng ng\u1ee7<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_23' name='opt_field_23' \/><\/div><\/div>"], "12": ["text", "<div class=\"form-group\"><div> Ph\u00f2ng t\u1eafm<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_12' name='opt_field_12' \/><\/div><\/div>"], "30": ["text", "<div class=\"form-group\"><div>Di\u1ec7n t\u00edch s\u1eed d\u1ee5ng<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_30' name='opt_field_30' \/><\/div><\/div>"], "11": ["text", "<div class=\"form-group\"><div>Ph\u00e1p l\u00fd<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_11' name='opt_field_11' \/><\/div><\/div>"], "19": ["text", "<div class=\"form-group\"><div>H\u1ecd v\u00e0 T\u00ean<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_19' name='opt_field_19' \/><\/div><\/div>"], "27": ["text", "<div class=\"form-group\"><div>M\u00e0u xe<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_27' name='opt_field_27' \/><\/div><\/div>"], "21": ["text", "<div class=\"form-group\"><div>Xu\u1ea5t x\u1ee9<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_21' name='opt_field_21' \/><\/div><\/div>"], "28": ["text", "<div class=\"form-group\"><div>Xe m\u1edbi (%)<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_28' name='opt_field_28' \/><\/div><\/div>"], "26": ["text", "<div class=\"form-group\"><div>N\u0103m s\u1ea3n xu\u1ea5t<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_26' name='opt_field_26' \/><\/div><\/div>"], "29": ["text", "<div class=\"form-group\"><div>Nhi\u00ean li\u1ec7u<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_29' name='opt_field_29' \/><\/div><\/div>"], "25": ["text", "<div class=\"form-group\"><div>D\u00f2ng xe<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_25' name='opt_field_25' \/><\/div><\/div>"], "24": ["text", "<div class=\"form-group\"><div>H\u00e3ng xe<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_24' name='opt_field_24' \/><\/div><\/div>"], "22": ["text", "<div class=\"form-group\"><div>H\u1ea1n s\u1eed d\u1ee5ng<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_22' name='opt_field_22' \/><\/div><\/div>"], "7": ["select", "<div class=\"form-group\"><div>H\u00e3ng s\u1ea3n xu\u1ea5t<\/div><div class=\"text-right\"><select class='chosen-select form-control' id='opt_field_7' name='opt_field_7'><label><option value='Apple'>Apple<\/option><\/label><label><option value='Samsung'>Samsung<\/option><\/label><label><option value='Blackberry'>Blackberry<\/option><\/label><label><option value='HTC'>HTC<\/option><\/label><label><option value='others'>C\u00e1c h\u00e3ng kh\u00e1c<\/option><\/label><\/select><\/div><\/div>"], "20": ["text", "<div class=\"form-group\"><div>N\u0103m sinh<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_20' name='opt_field_20' \/><\/div><\/div>"], "2": ["text", "<div class=\"form-group\"><div>Kinh nghi\u1ec7m l\u00e0m vi\u1ec7c<\/div><div class=\"text-right\"><input class='form-control' type='text' id='opt_field_2' name='opt_field_2' \/><\/div><\/div>"] }; 
catOptionsJS['cat'] = { "9": ["3", "2"], "75": ["3", "13", "14", "15", "16", "17", "1", "18", "6"], "11": ["4", "8", "5", "9", "10", "23", "12", "30", "11"], "76": ["27", "21", "28", "26", "29", "25", "24"], "1": ["21", "22"], "3": ["7"], "2": ["7"], "98": ["2"] };
