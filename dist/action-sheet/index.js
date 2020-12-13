import zIndex from "../behaviors/zIndex";
import hover from "../behaviors/hover";

Component({
    behaviors: [zIndex, hover],
    externalClasses: ["l-class-title", "l-class-item", "l-class-cancel", "l-title-class", "l-item-class", "l-cancel-class"],
    properties: {
        locked: Boolean,
        showCancel: Boolean,
        show: Boolean,
        itemList: Array,
        cancelText: {type: String, value: "取消"},
        title: String,
        zIndex: {type: Number, value: 777},
        openApi: {type: Boolean, value: !0}
    },
    data: {success: "", fail: "", isIphoneX: !1},
    attached() {
        this.data.openApi && this.initActionSheet(), this.initUIAdapter()
    },
    pageLifetimes: {
        show() {
            this.data.openApi && this.initActionSheet()
        }
    },
    methods: {
        initUIAdapter() {
            wx.getSystemInfo({
                success: e => {
                    this.setData({isIphoneX: "iPhone X" === e.model})
                }
            })
        }, initActionSheet() {
            wx.lin = wx.lin || {}, wx.lin.showActionSheet = (e = {}) => {
                const {itemList: t = [], success: s = null, fail: i = null, title: a = "", locked: l = !1, cancelText: n = "取消", showCancel: c = !1} = e;
                return this.setData({
                    itemList: t.slice(0, 10),
                    success: s,
                    fail: i,
                    title: a,
                    locked: l,
                    cancelText: n,
                    showCancel: c,
                    show: !0
                }), this
            }
        }, handleClickItem(e) {
            const {success: t} = this.data;
            t && t({...e.currentTarget.dataset}), this.triggerEvent("linitemtap", {...e.currentTarget.dataset}, {
                bubbles: !0,
                composed: !0
            }), this._hideActionSheet()
        }, _showActionSheet() {
            this.setData({show: !0})
        }, _hideActionSheet() {
            this.setData({show: !1})
        }, handleClickCancel() {
            const {fail: e} = this.data;
            e && e({errMsg: "showactionsheet:fail cancel"}), this.triggerEvent("lincancel", {errMsg: "showactionsheet:fail cancel"}, {
                bubbles: !0,
                composed: !0
            }), this._hideActionSheet()
        }, handleClickPopUp() {
            this.data.locked || this.handleClickCancel()
        }
    }
});
