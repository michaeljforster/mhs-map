var SITELIST = null;
var LISTWIDGET = null;
var MAP = null;
function setMapAreaMode() {
    __setf_siteListMode('map-area', SITELIST);
    return __setf_siteListMunicipalityName('', SITELIST);
};
function setMunicipalityMode(municipalityName) {
    __setf_mapWidgetRecenterP(true, MAP);
    __setf_siteListMode('municipality', SITELIST);
    return __setf_siteListMunicipalityName(municipalityName, SITELIST);
};
function initialize() {
    jQuery('#my-tabs a').click(function (e) {
        return jQuery(this, tab('show'));
    });
    SITELIST = new SiteList(FEATURESURI);
    LISTWIDGET = new ListWidget(SITELIST, jQuery('#list-view'));
    siteListSubscribeToPopulated(SITELIST, function () {
        console.log('LIST-WIDGET notified ' + siteListSize(SITELIST));
        return updateWidget(LISTWIDGET);
    });
    MAP = new MapWidget(SITELIST, jQuery('#map-canvas'), DEFAULTCENTER, DEFAULTZOOM, GEOLOCATIONOPTIONS);
    siteListSubscribeToPopulated(SITELIST, function () {
        console.log('MAP notified ' + siteListSize(SITELIST));
        return updateWidget(MAP);
    });
    return mapWidgetListenOnIdle(MAP, function (mapWidget) {
        return __setf_siteListBounds(mapWidgetBounds(mapWidget), SITELIST);
    });
};
