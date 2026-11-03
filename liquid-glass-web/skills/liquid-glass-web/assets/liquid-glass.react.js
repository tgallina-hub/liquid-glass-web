/* @ds-bundle: {"format":4,"namespace":"LG","components":[{"name":"Glass"},{"name":"Button"},{"name":"GlassGroup"},{"name":"Toolbar"},{"name":"TabBar"},{"name":"Toggle"},{"name":"SearchField"},{"name":"Menu"},{"name":"Sheet"},{"name":"ListSection"},{"name":"Status"},{"name":"Icon"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(" ");
  }
  function omit(obj, keys) {
    var o = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) o[k] = obj[k];
    return o;
  }

  /* ---- Icon: a small original stroke set, 24px grid, 1.75 stroke, currentColor ---- */
  var PATHS = {
    home: "M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z",
    search: "M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 20 20",
    plus: "M12 5v14M5 12h14",
    close: "M6 6l12 12M18 6 6 18",
    check: "M5 12.5 10 17l9-10",
    chevron: "M9 5l7 7-7 7",
    back: "M15 5l-7 7 7 7",
    more: "M6 12h.01M12 12h.01M18 12h.01",
    bell: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2.2 2.2 0 0 0 4 0",
    key: "M14.5 4a5.5 5.5 0 1 1-4.9 8L4 17.6V20h2.4v-2h2v-2h2l1.4-1.4A5.5 5.5 0 0 1 14.5 4zM16 8.5h.01",
    shield: "M12 3.5 19 6v5.5c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V6z",
    person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0",
    gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8",
    share: "M12 15V4M8 8l4-4 4 4M6 12v7h12v-7",
    trash: "M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13",
    filter: "M4 6h16M7 12h10M10 18h4",
    clock: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 8v4l3 2",
    warning: "M12 4 21 19H3zM12 10v4M12 16.8h.01",
    info: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 11v5M12 8h.01"
  };
  function Icon(p) {
    var d = PATHS[p.name] || PATHS.info;
    var label = p.label;
    return h("svg", {
      className: cx("lg-icon", p.className), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
      strokeWidth: p.weight || 1.75, strokeLinecap: "round", strokeLinejoin: "round",
      role: label ? "img" : undefined, "aria-label": label || undefined, "aria-hidden": label ? undefined : "true",
      style: p.size ? { width: p.size, height: p.size } : undefined
    }, h("path", { d: d }));
  }
  Icon.names = Object.keys(PATHS);

  /* ---- Glass: the material on any element ---- */
  function Glass(p) {
    var variant = p.variant || "regular";
    var shape = p.shape || "rounded";
    var Tag = p.as || "div";
    var rest = omit(p, ["variant", "shape", "as", "className", "children", "dim", "flat"]);
    var el = h(Tag, Object.assign(rest, {
      className: cx("lg-glass", variant === "clear" && "lg-glass--clear", p.flat && "lg-glass--flat", "lg-shape-" + shape, p.className)
    }), p.children);
    return el;
  }

  /* ---- Button ---- */
  function Button(p) {
    var variant = p.variant || "glass";
    var size = p.size || "md";
    var iconOnly = p.icon && !p.children;
    var rest = omit(p, ["variant", "size", "icon", "className", "children", "destructive"]);
    var isGlass = variant === "glass" || variant === "clear";
    if (iconOnly && !p["aria-label"]) rest["aria-label"] = p.icon;
    return h("button", Object.assign({ type: "button" }, rest, {
      className: cx(
        "lg-btn lg-focusable", "lg-btn--" + variant, size !== "md" && "lg-btn--" + size,
        iconOnly && "lg-btn--icon", p.destructive && "lg-btn--destructive",
        isGlass && "lg-glass", variant === "clear" && "lg-glass--clear", p.className
      )
    }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  }

  /* ---- GlassGroup: related items share one capsule of glass ---- */
  function GlassGroup(p) {
    var kids = React.Children.toArray(p.children);
    var out = [];
    kids.forEach(function (c, i) {
      if (i > 0 && p.separators) out.push(h("span", { key: "s" + i, className: "lg-group-sep", "aria-hidden": "true" }));
      out.push(c);
    });
    return h("div", { role: "group", "aria-label": p.label, className: cx("lg-group lg-glass", p.variant === "clear" && "lg-glass--clear", p.className) }, out);
  }

  /* ---- Toolbar: floating groups over content, with a scroll edge effect ---- */
  function Toolbar(p) {
    var edge = p.edge === undefined ? "top" : p.edge;
    return h(React.Fragment, null,
      edge ? h("div", { className: "lg-edge lg-edge--" + edge, "aria-hidden": "true" }) : null,
      h("div", { role: "toolbar", "aria-label": p.label || p.title, className: cx("lg-toolbar", p.className), style: p.style },
        p.leading || null,
        p.title ? h("div", { className: "lg-toolbar__title" }, p.title) : h("div", { className: "lg-toolbar__spacer" }),
        p.trailing || null
      )
    );
  }
  function ToolbarSpacer(p) { return h("span", { className: p.fixed === false ? "lg-toolbar__spacer" : "lg-toolbar__fixed", "aria-hidden": "true" }); }
  Toolbar.Spacer = ToolbarSpacer;

  /* ---- TabBar ---- */
  function TabBar(p) {
    var items = p.items || [];
    var state = React.useState(p.defaultValue || (items[0] && items[0].id));
    var value = p.value !== undefined ? p.value : state[0];
    function pick(id) { if (p.value === undefined) state[1](id); if (p.onChange) p.onChange(id); }
    return h("nav", { className: cx("lg-tabbar-wrap", p.className), "aria-label": p.label || "Tabs" },
      h("div", { role: "tablist", className: cx("lg-tabbar lg-glass", p.minimized && "lg-tabbar--min") },
        items.map(function (it) {
          var sel = it.id === value;
          return h("button", {
            key: it.id, role: "tab", type: "button", "aria-selected": sel ? "true" : "false",
            "aria-label": p.minimized ? it.label : undefined,
            className: "lg-tab lg-focusable", onClick: function () { pick(it.id); }
          }, h(Icon, { name: it.icon }), h("span", null, it.label));
        })
      ),
      p.onSearch ? h("button", { type: "button", className: "lg-tab-search lg-glass lg-focusable", "aria-label": "Search", onClick: p.onSearch }, h(Icon, { name: "search" })) : null
    );
  }

  /* ---- Toggle ---- */
  function Toggle(p) {
    var st = React.useState(!!p.defaultChecked);
    var on = p.checked !== undefined ? p.checked : st[0];
    var id = React.useId ? React.useId() : "lg-t" + Math.random().toString(36).slice(2);
    function flip() { if (p.disabled) return; if (p.checked === undefined) st[1](!on); if (p.onChange) p.onChange(!on); }
    var sw = h("button", {
      type: "button", role: "switch", id: id, "aria-checked": on ? "true" : "false", disabled: p.disabled,
      "aria-label": p.children ? undefined : p["aria-label"], "aria-labelledby": p.children ? id + "-l" : undefined,
      className: cx("lg-toggle__track lg-focusable", p.pressed && "is-pressed"), onClick: flip
    }, h("span", { className: "lg-toggle__knob" }));
    if (!p.children) return sw;
    return h("div", { className: cx("lg-toggle", p.className) }, h("span", { id: id + "-l", onClick: flip }, p.children), sw);
  }

  /* ---- SearchField ---- */
  function SearchField(p) {
    var rest = omit(p, ["className", "placement", "placeholder"]);
    var onSurface = p.placement === "surface";
    return h("label", { className: cx("lg-search", onSurface ? "lg-search--surface" : "lg-glass", p.className) },
      h(Icon, { name: "search" }),
      h("input", Object.assign({ type: "search", placeholder: p.placeholder || "Search", "aria-label": p["aria-label"] || p.placeholder || "Search" }, rest))
    );
  }

  /* ---- Menu: grows out of the button that opened it ---- */
  function Menu(p) {
    var items = p.items || [];
    return h("div", { role: "menu", "aria-label": p.label, className: cx("lg-menu lg-glass", p.className), style: Object.assign({ "--lg-origin": p.origin || "top right" }, p.style) },
      items.map(function (it, i) {
        if (it === "-" || it.separator) return h("div", { key: "sep" + i, role: "separator", className: "lg-menu__sep" });
        return h("button", {
          key: it.id || it.label, role: "menuitem", type: "button",
          className: cx("lg-menu__item", it.destructive && "lg-menu__item--destructive"),
          onClick: function () { if (p.onSelect) p.onSelect(it.id || it.label); }
        }, it.label, it.icon ? h(Icon, { name: it.icon }) : null);
      })
    );
  }

  /* ---- Sheet ---- */
  function Sheet(p) {
    if (p.open === false) return null;
    var large = p.detent === "large";
    var titleId = "lg-sheet-" + (p.id || "t");
    return h("div", { className: cx("lg-sheet-layer", p.contained && "lg-sheet-layer--contained", large && "lg-sheet-layer--large"), onClick: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
      h("div", { role: "dialog", "aria-modal": large ? "true" : "false", "aria-labelledby": titleId, className: cx("lg-sheet", large ? "lg-sheet--large" : "lg-glass", p.className) },
        h("div", { className: "lg-sheet__grabber", "aria-hidden": "true" }),
        h("div", { className: "lg-sheet__head" },
          p.onClose ? h(Button, { icon: "close", "aria-label": "Close", onClick: p.onClose }) : h("span", { style: { width: 36 } }),
          h("h2", { id: titleId, className: "lg-sheet__title" }, p.title),
          p.action || h("span", { style: { width: 36 } })
        ),
        h("div", { className: "lg-sheet__body" }, p.children)
      )
    );
  }

  /* ---- ListSection ---- */
  function ListSection(p) {
    var rows = p.rows || [];
    return h("section", { className: cx("lg-section", p.className) },
      p.header ? h("h3", { className: "lg-section__header" }, p.header) : null,
      h("div", { className: "lg-section__body" },
        rows.map(function (r, i) {
          var inner = [
            r.icon ? h("span", { key: "l", className: "lg-row__lead" }, h(Icon, { name: r.icon })) : null,
            h("span", { key: "m", className: "lg-row__main" },
              h("span", { className: "lg-row__title", style: { display: "block" } }, r.title),
              r.subtitle ? h("span", { className: "lg-row__sub", style: { display: "block" } }, r.subtitle) : null),
            r.detail ? h("span", { key: "d", className: "lg-row__detail" }, r.detail) : null,
            r.accessory || null,
            r.onClick ? h(Icon, { key: "c", name: "chevron", className: "lg-row__chev" }) : null
          ];
          return r.onClick
            ? h("button", { key: i, type: "button", className: "lg-row lg-row--button lg-focusable", onClick: r.onClick }, inner)
            : h("div", { key: i, className: "lg-row" }, inner);
        })
      ),
      p.footer ? h("p", { className: "lg-section__footer" }, p.footer) : null
    );
  }

  /* ---- Status: color never travels alone ---- */
  var STATUS_ICON = { positive: "check", warning: "warning", critical: "warning" };
  function Status(p) {
    var tone = p.tone || "positive";
    return h("span", { className: cx("lg-status", "lg-status--" + tone, p.className) }, h(Icon, { name: STATUS_ICON[tone] || "info", weight: 2 }), p.children);
  }

  window.LG = window.LG || {};
  Object.assign(window.LG, {
    Glass: Glass, Button: Button, GlassGroup: GlassGroup, Toolbar: Toolbar, TabBar: TabBar, Toggle: Toggle,
    SearchField: SearchField, Menu: Menu, Sheet: Sheet, ListSection: ListSection, Status: Status, Icon: Icon
  });
})();
