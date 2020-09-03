(this.webpackJsonpaddons = this.webpackJsonpaddons || []).push([
  [0],
  {
    130: function (e, a, t) {},
    132: function (e, a, t) {
      'use strict';
      t.r(a);
      var n = t(1),
        l = t.n(n),
        o = t(18),
        r = t.n(o),
        c = t(75),
        i = t(11),
        s = t(12),
        u = t(23),
        m = t(8),
        g = t(134),
        d = t(135),
        f = t(136),
        b = t(145),
        v = t(146),
        p = t(137),
        h = t(138),
        E = t(139),
        y = t(140),
        S = t(70),
        C = t(133),
        O = function (e, a) {
          console.log('raiseEvent()');
          var t = { eventName: e, customData: a };
          window.parent.postMessage(t, '*');
        },
        j = t(14),
        A = t(16),
        N = t(31),
        k = t.n(N),
        M = { APAC: ['ANZ', 'Japan', 'SEA', 'Korea', 'India', 'China'], EMEA: ['Central', 'North', 'South'], LATAM: ['Andean', 'Brazil', 'Mexico', 'Southern-Cone'], NA: ['East', 'Central', 'West', 'Canada', 'Government', 'Velocity', 'Channels'] },
        x = t(77),
        R = t(40),
        w = t.n(R),
        L = t(69),
        F = function (e, a, t) {
          console.log('searchUser(['.concat(t, '])'));
          var n,
            l = t.split(' '),
            o = [{ type: 'EXACT', fields: ['state'], value: 'active' }],
            r = Object(u.a)(l);
          try {
            for (r.s(); !(n = r.n()).done; ) {
              var c = n.value;
              c && o.push({ type: 'QUERY_STRING', fields: ['name', 'email', 'title', 'department'], value: c });
            }
          } catch (s) {
            r.e(s);
          } finally {
            r.f();
          }
          var i = { pageSize: 5, pageNumber: 1, types: ['users'], query: o, sortOrder: 'ASC', sortBy: 'name' };
          return fetch('https://api.'.concat(e, '/api/v2/search?profile=false'), { method: 'POST', headers: { Authorization: 'bearer '.concat(a), 'Content-Type': 'application/json' }, body: JSON.stringify(i) })
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              if (e.status < 200 || e.status > 299) throw new Error(JSON.stringify(e));
              return e.results && e.results.length > 0 ? e.results : [];
            });
        };
      function P(e) {
        return l.a.createElement(
          'div',
          { style: { display: 'flex', backgroundColor: '#dddddd', borderRadius: '2px', marginBottom: '4px', marginRight: '4px' } },
          l.a.createElement('div', { style: { fontSize: '0.8em', paddingLeft: '8px', lineHeight: '20px' } }, e.name),
          l.a.createElement(
            'div',
            null,
            l.a.createElement(
              S.a,
              {
                style: { height: '20px', lineHeight: '10px', color: 'black' },
                color: 'link',
                size: 'sm',
                outline: !0,
                onClick: function () {
                  e.onRemoveClick();
                },
              },
              l.a.createElement(j.f, null)
            )
          )
        );
      }
      var T = '';
      function D(e) {
        var a = Object(n.useState)(!1),
          t = Object(m.a)(a, 2),
          o = t[0],
          r = t[1],
          c = Object(n.useState)(!1),
          i = Object(m.a)(c, 2),
          s = i[0],
          u = i[1],
          g = Object(n.useState)(''),
          d = Object(m.a)(g, 2),
          f = d[0],
          b = d[1],
          v = Object(n.useState)([]),
          p = Object(m.a)(v, 2),
          h = p[0],
          E = p[1],
          y = Object(n.useState)([]),
          S = Object(m.a)(y, 2),
          O = S[0],
          j = S[1];
        Object(n.useEffect)(
          function () {
            Array.isArray(e.initialValue) ? j(e.initialValue) : j([]);
          },
          [e.initialValue]
        );
        var A = (function () {
          var a = Object(L.a)(
            w.a.mark(function a(t) {
              var n;
              return w.a.wrap(function (a) {
                for (;;)
                  switch ((a.prev = a.next)) {
                    case 0:
                      if ((console.log('searchForUser(['.concat(t, '])')), (T = t), b(t), !s)) {
                        a.next = 5;
                        break;
                      }
                      return a.abrupt('return');
                    case 5:
                      if (t && !(t.length < 3)) {
                        a.next = 8;
                        break;
                      }
                      return E([]), a.abrupt('return');
                    case 8:
                      return u(!0), (a.next = 11), F('mypurecloud.com', e.token, t);
                    case 11:
                      (n = a.sent),
                        Array.isArray(n)
                          ? E(
                              n.map(function (e) {
                                return e.name;
                              })
                            )
                          : E([]),
                        u(!1),
                        T !== t && A(T);
                    case 15:
                    case 'end':
                      return a.stop();
                  }
              }, a);
            })
          );
          return function (e) {
            return a.apply(this, arguments);
          };
        })();
        return l.a.createElement(
          'div',
          { style: e && e.isDisabled ? { pointerEvents: 'none', backgroundColor: '#F2F2F2' } : {} },
          l.a.createElement(
            'div',
            { style: { padding: '4px', border: '1px solid #cccccc', borderRadius: '4px' } },
            l.a.createElement(
              'div',
              { style: { display: 'flex', flexWrap: 'wrap' } },
              Array.isArray(O) &&
                O.map(function (a, t) {
                  return l.a.createElement(P, {
                    key: t,
                    name: a,
                    onRemoveClick: function () {
                      var t = O.filter(function (e) {
                        return e !== a;
                      });
                      j(t), e.onChange(t);
                    },
                  });
                })
            ),
            l.a.createElement(C.a, {
              isDisabled: e.isDisabled,
              onFocus: function () {
                r(!0), E([]);
              },
              onBlur: function () {
                setTimeout(function () {
                  b(''), r(!1);
                }, 200);
              },
              style: s ? { backgroundColor: '#eeeeee' } : {},
              placeholder: 'Search for user...',
              value: f || '',
              onChange: function (e) {
                A(e.target.value);
              },
            }),
            o &&
              l.a.createElement(
                C.a,
                {
                  type: 'select',
                  style: { height: '90px', position: 'absolute' },
                  multiple: !0,
                  onChange: function (a) {
                    var t = a.target.options[a.target.selectedIndex].text;
                    if ((!t || (!t.startsWith('Searching...') && !t.startsWith('Type a name...'))) && Array.isArray(O) && !O.includes(t)) {
                      var n = Object(x.a)(O);
                      n.push(t), j(n), e.onChange(n);
                    }
                  },
                },
                s && l.a.createElement('option', null, 'Searching...'),
                !s && (!f || f.length < 3) && l.a.createElement('option', null, 'Type a name...'),
                !s &&
                  Array.isArray(h) &&
                  h.map(function (e, a) {
                    return l.a.createElement('option', { key: a }, e);
                  })
              )
          )
        );
      }
      var G = { isTest: !1, status: null, isDeleted: !1, handled: null, created: null, region: null, subRegion: null, product: null, segment: null, requester: null, programManager: null, teamMember: null, customerName: null };
      function q(e) {
        var a = Object(n.useState)(null),
          t = Object(m.a)(a, 2),
          o = t[0],
          r = t[1],
          c = Object(n.useState)(!1),
          i = Object(m.a)(c, 2),
          N = i[0],
          x = i[1],
          R = Object(n.useState)('edit'),
          w = Object(m.a)(R, 2),
          L = w[0],
          F = w[1],
          P = Object(n.useState)(''),
          T = Object(m.a)(P, 2),
          q = T[0],
          J = T[1],
          I = Object(n.useState)(null),
          B = Object(m.a)(I, 2),
          z = B[0],
          W = B[1],
          U = Object(n.useState)([]),
          V = Object(m.a)(U, 2),
          H = V[0],
          Q = V[1],
          $ = Object(n.useState)(!1),
          _ = Object(m.a)($, 2),
          K = _[0],
          X = _[1],
          Y = Object(n.useState)(G),
          Z = Object(m.a)(Y, 2),
          ee = Z[0],
          ae = Z[1],
          te = Object(n.useState)(!1),
          ne = Object(m.a)(te, 2),
          le = ne[0],
          oe = ne[1],
          re = Object(n.useState)(!1),
          ce = Object(m.a)(re, 2),
          ie = ce[0],
          se = ce[1],
          ue = Object(n.useState)([]),
          me = Object(m.a)(ue, 2),
          ge = me[0],
          de = me[1];
        Object(n.useEffect)(function () {
          var a = k.a.parse(e.location.search);
          console.log('parsedQueryString: ', a), r(a);
          var t = Ee(),
            n = t || G;
          (n.isTest = 'localhost' === window.location.hostname),
            console.log('initialFilterSet.isTest: ', n.isTest),
            a && a.requester ? (console.log('fixed requester will be set to: ', a.requester), (n.requester = [a.requester]), se(!0)) : a && a.region && 'super-user' !== a.region.toLowerCase() && (console.log('fixed region will be set to: ', a.region), (n.region = [{ value: a.region, label: a.region }]), oe(!0)),
            (n.subRegion = je(n.region, n.subRegion)),
            ae(n),
            Oe(n.region),
            O('applyFilter', n);
        }, []);
        var fe = function (e) {
            if ((console.log('saveFilterNameValid() ', e), !e)) return !1;
            return !(!(e && e.length <= 30 && /^(?=.*[^\W_])[\w ]*$/.test(e)) || ve(e));
          },
          be = 'filter.configuration.list',
          ve = function (e) {
            console.log('localStorageGet()');
            var a = localStorage.getItem(be);
            if (!a) return null;
            var t = JSON.parse(a);
            return Array.isArray(t)
              ? t.filter(function (a) {
                  return a.name === e;
                })[0]
              : null;
          },
          pe = function (e, a) {
            console.log('localStorageSet()');
            var t = localStorage.getItem(be),
              n = t ? JSON.parse(t) : [];
            if (Array.isArray(n)) {
              var l = n.filter(function (a) {
                return a.name !== e;
              });
              l.push({ name: e, filterConfiguration: a }), localStorage.setItem(be, JSON.stringify(l));
            }
          },
          he = function (e) {
            console.log('localStorageDrop()');
            var a = localStorage.getItem(be);
            if (a) {
              var t = JSON.parse(a);
              if (Array.isArray(t)) {
                var n = t.filter(function (a) {
                  return a.name !== e;
                });
                localStorage.setItem(be, JSON.stringify(n));
              }
            }
          },
          Ee = function (e) {
            console.log('localStorageGetLatestFilter');
            var a = localStorage.getItem('filter.configuration.latest');
            if (a) return JSON.parse(a);
          },
          ye = function (e) {
            console.log('localStorageSetLatestFilter'), localStorage.setItem('filter.configuration.latest', JSON.stringify(e));
          },
          Se = function () {
            console.log('localStorageDropLatestFilter'), localStorage.removeItem('filter.configuration.latest');
          },
          Ce = function () {
            console.log('reloadFilterList()');
            var e = (function () {
              console.log('localStorageGetAll()');
              var e = localStorage.getItem(be);
              if (!e) return [];
              var a = JSON.parse(e);
              return Array.isArray(a) ? a : [];
            })().map(function (e) {
              return { value: e.name, label: e.name };
            });
            console.log(e), Q(e), W(null);
          },
          Oe = function (e) {
            if ((console.log('applySubRegionList()'), Array.isArray(e) && 0 !== e.length)) {
              var a,
                t = [],
                n = Object(u.a)(e);
              try {
                for (n.s(); !(a = n.n()).done; ) {
                  var l = a.value,
                    o = M[l.value];
                  if (Array.isArray(o)) {
                    var r,
                      c = Object(u.a)(o);
                    try {
                      for (c.s(); !(r = c.n()).done; ) {
                        var i = r.value;
                        t.push({ value: ''.concat(l.value, '/').concat(i), label: ''.concat(l.value, '/').concat(i) });
                      }
                    } catch (s) {
                      c.e(s);
                    } finally {
                      c.f();
                    }
                  }
                }
              } catch (s) {
                n.e(s);
              } finally {
                n.f();
              }
              de(t);
            } else de([]);
          },
          je = function (e, a) {
            console.log('removeSelectedSubregionsForNotSelectedRegions()');
            var t = [];
            if (!Array.isArray(e)) return [];
            if (!Array.isArray(a)) return [];
            var n,
              l = Object(u.a)(e);
            try {
              for (l.s(); !(n = l.n()).done; ) {
                var o,
                  r = n.value,
                  c = Object(u.a)(a);
                try {
                  for (c.s(); !(o = c.n()).done; ) {
                    var i = o.value;
                    i.value.startsWith(r.value) && t.push(i);
                  }
                } catch (s) {
                  c.e(s);
                } finally {
                  c.f();
                }
              }
            } catch (s) {
              l.e(s);
            } finally {
              l.f();
            }
            return t;
          };
        return l.a.createElement(
          l.a.Fragment,
          null,
          l.a.createElement(
            g.a,
            { color: 'light' },
            l.a.createElement('span', { style: { fontWeight: '600' } }, l.a.createElement(j.c, { style: { marginRight: '4px' } }), 'Filter configuration'),
            l.a.createElement(
              d.a,
              { className: 'ml-auto', navbar: !0 },
              l.a.createElement(
                f.a,
                {
                  isOpen: N,
                  toggle: function () {
                    return x(function (e) {
                      return !e;
                    });
                  },
                },
                l.a.createElement(b.a, { caret: !0 }, l.a.createElement(j.d, null)),
                l.a.createElement(
                  v.a,
                  { right: !0 },
                  l.a.createElement(
                    p.a,
                    {
                      onClick: function () {
                        console.log('handleMenuOptionLoad()'), Ce(), X(!1), F('load');
                      },
                    },
                    l.a.createElement(j.b, null),
                    ' Filter list...'
                  ),
                  l.a.createElement(
                    p.a,
                    {
                      onClick: function () {
                        console.log('handleMenuOptionSave()'), F('save');
                      },
                    },
                    l.a.createElement(j.i, null),
                    ' Save filter as...'
                  ),
                  l.a.createElement(p.a, { divider: !0 }),
                  l.a.createElement(
                    p.a,
                    {
                      onClick: function () {
                        console.log('handleMenuOptionClear()'), ae(G), Oe(G.region), O('clearFilter', {}), Se();
                      },
                    },
                    l.a.createElement(j.a, null),
                    ' Clear filter'
                  )
                )
              )
            )
          ),
          'load' === L &&
            l.a.createElement(
              h.a,
              { className: 'p-3', style: K ? { backgroundColor: 'mistyrose' } : { backgroundColor: 'antiquewhite' } },
              l.a.createElement(E.a, null, 'Filter list'),
              l.a.createElement(A.a, {
                isDisabled: K,
                noOptionsMessage: function () {
                  return 'No filters configured yet';
                },
                className: 'mb-3',
                options: H,
                isMulti: !1,
                isSearchable: !0,
                value: z,
                onChange: function (e) {
                  W(e);
                  var a = ve(e.value);
                  a && a.filterConfiguration && (ae(a.filterConfiguration), Oe(a.filterConfiguration.region));
                },
              }),
              !K &&
                l.a.createElement(
                  y.a,
                  { style: { textAlign: 'center' }, inline: !0 },
                  l.a.createElement(
                    S.a,
                    {
                      outline: !0,
                      size: 'sm',
                      color: 'primary',
                      className: 'ml-2',
                      onClick: function () {
                        console.log('handleLoadApplyBtn()'), F('edit'), W(null), O('applyFilter', ee), ye(ee);
                      },
                      disabled: !z,
                    },
                    l.a.createElement(j.g, null),
                    ' Apply'
                  ),
                  l.a.createElement(
                    S.a,
                    {
                      outline: !0,
                      size: 'sm',
                      color: 'danger',
                      className: 'ml-2',
                      onClick: function () {
                        console.log('handleLoadDeleteBtn()'), X(!0);
                      },
                      disabled: !z,
                    },
                    l.a.createElement(j.h, null),
                    ' Delete'
                  ),
                  l.a.createElement(
                    S.a,
                    {
                      outline: !0,
                      size: 'sm',
                      color: 'secondary',
                      className: 'ml-2',
                      onClick: function () {
                        console.log('handleLoadCloseBtn()'), F('edit'), W(null);
                      },
                    },
                    l.a.createElement(j.f, null),
                    ' Close'
                  )
                ),
              K &&
                l.a.createElement(
                  y.a,
                  { style: { textAlign: 'center' }, inline: !0 },
                  l.a.createElement(
                    S.a,
                    {
                      outline: !0,
                      size: 'sm',
                      color: 'secondary',
                      className: 'ml-2',
                      onClick: function () {
                        console.log('handleLoadDeleteCancelBtn()'), X(!1);
                      },
                    },
                    l.a.createElement(j.f, null),
                    ' Cancel'
                  ),
                  l.a.createElement(
                    S.a,
                    {
                      outline: !0,
                      size: 'sm',
                      color: 'danger',
                      className: 'ml-2',
                      onClick: function () {
                        console.log('handleLoadDeleteConfirmBtn()'), X(!1), he(z.value), Ce();
                      },
                      disabled: !z,
                    },
                    l.a.createElement(j.h, null),
                    ' Confirm delete'
                  )
                )
            ),
          'save' === L &&
            l.a.createElement(
              h.a,
              { className: 'p-3', style: { backgroundColor: 'antiquewhite' } },
              l.a.createElement(E.a, null, 'Save filter as'),
              l.a.createElement(C.a, {
                type: 'text',
                className: 'form-control',
                placeholder: 'Enter a name',
                value: q,
                onChange: function (e) {
                  console.log('handleSaveFilterNameChanged() ', e.target.value), J(e.target.value);
                },
              }),
              q && !fe(q) && l.a.createElement('span', { style: { color: 'red', fontWeight: '600' } }, 'Please enter a valid and unique value'),
              l.a.createElement(
                y.a,
                { style: { textAlign: 'center' }, className: 'mt-3', inline: !0 },
                l.a.createElement(
                  S.a,
                  {
                    outline: !0,
                    size: 'sm',
                    color: 'primary',
                    className: 'ml-2',
                    onClick: function () {
                      console.log('handleSaveOkBtn()'), pe(q, ee), J(''), F('edit');
                    },
                    disabled: !fe(q),
                  },
                  l.a.createElement(j.e, null),
                  ' Save'
                ),
                l.a.createElement(
                  S.a,
                  {
                    outline: !0,
                    size: 'sm',
                    color: 'secondary',
                    className: 'ml-2',
                    onClick: function () {
                      console.log('handleSaveCancelBtn()'), J(''), F('edit');
                    },
                  },
                  l.a.createElement(j.f, null),
                  ' Cancel'
                )
              )
            ),
          l.a.createElement(
            'div',
            { className: 'edit' === L ? '' : 'disabled' },
            l.a.createElement(
              'div',
              { className: 'p-3' },
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Status',
                l.a.createElement(A.a, {
                  options: [
                    { value: 'Open', label: 'Open' },
                    { value: 'On Hold', label: 'On Hold' },
                    { value: 'Waiting On Additional Information', label: 'Waiting On Additional Information' },
                    { value: 'Closed', label: 'Closed' },
                  ],
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.status,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.status = e), ae(a);
                  },
                }),
                l.a.createElement(
                  E.a,
                  { check: !0, className: 'ml-4' },
                  l.a.createElement(C.a, {
                    type: 'checkbox',
                    checked: ee.isDeleted,
                    onChange: function (e) {
                      console.log(e.target.checked);
                      var a = Object(s.a)({}, ee);
                      (a.isDeleted = e.target.checked), ae(a);
                    },
                  }),
                  ' ',
                  'Show deleted only'
                )
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Created',
                l.a.createElement(A.a, {
                  options: [
                    { value: 'Last30Days', label: 'Last 30 Days' },
                    { value: 'CurrentMonth', label: 'Current Month' },
                    { value: 'LastMonth', label: 'Last Month' },
                  ],
                  isMulti: !1,
                  isSearchable: !0,
                  value: ee.createdAt,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.createdAt = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Handled',
                l.a.createElement(A.a, {
                  options: [
                    { value: 'Accepted', label: 'Accepted' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Unhandled', label: 'Unhandled' },
                  ],
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.handled,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.handled = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Region',
                l.a.createElement(A.a, {
                  isDisabled: le,
                  options: [
                    { value: 'APAC', label: 'APAC' },
                    { value: 'EMEA', label: 'EMEA' },
                    { value: 'LATAM', label: 'LATAM' },
                    { value: 'NA', label: 'NA' },
                  ],
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.region,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.region = e), (a.subRegion = je(a.region, a.subRegion)), ae(a), Oe(a.region);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Territory',
                l.a.createElement(A.a, {
                  options: ge,
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.subRegion,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.subRegion = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Product',
                l.a.createElement(A.a, {
                  options: [
                    { value: 'Genesys Cloud', label: 'Genesys Cloud' },
                    { value: 'Genesys Engage', label: 'Genesys Engage' },
                    { value: 'Genesys Engage Cloud', label: 'Genesys Engage Cloud' },
                    { value: 'PureConnect', label: 'PureConnect' },
                    { value: 'Latitude by Genesys', label: 'Latitude by Genesys' },
                  ],
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.product,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.product = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Market segment',
                l.a.createElement(A.a, {
                  options: [
                    { value: 'Mid-market', label: 'Mid-market' },
                    { value: 'Commercial', label: 'Commercial' },
                    { value: 'Enterprise', label: 'Enterprise' },
                  ],
                  isMulti: !0,
                  isSearchable: !0,
                  value: ee.segment,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.segment = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Requester name',
                l.a.createElement(D, {
                  isDisabled: ie,
                  token: o && o.token ? o.token : null,
                  initialValue: ee.requester,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.requester = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Program manager',
                l.a.createElement(D, {
                  token: o && o.token ? o.token : null,
                  initialValue: ee.programManager,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.programManager = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Team member',
                l.a.createElement(D, {
                  token: o && o.token ? o.token : null,
                  initialValue: ee.teamMember,
                  onChange: function (e) {
                    console.log(e);
                    var a = Object(s.a)({}, ee);
                    (a.teamMember = e), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3' },
                'Customer name',
                l.a.createElement(C.a, {
                  placeholder: 'Enter a name',
                  value: ee.customerName || '',
                  onChange: function (e) {
                    console.log(e.target.value);
                    var a = Object(s.a)({}, ee);
                    (a.customerName = e.target.value), ae(a);
                  },
                })
              ),
              l.a.createElement(
                'div',
                { className: 'mb-3', style: { textAlign: 'center' } },
                l.a.createElement(
                  S.a,
                  {
                    outline: !0,
                    onClick: function () {
                      console.log('handleApplyFilters()'), O('applyFilter', ee), ye(ee);
                    },
                  },
                  l.a.createElement(j.g, null),
                  ' Apply filter'
                )
              )
            )
          )
        );
      }
      var J = t(141),
        I = t(142),
        B = t(143),
        z = t(147),
        W = t(144),
        U = t(32),
        V = t(73),
        H = t.n(V),
        Q = function (e, a) {
          console.log('searchMailConfiguration '.concat(JSON.stringify(a)));
          var t = { token: e, region: a.region, product: a.product, category: a.category };
          return fetch('http://localhost:3000/mailconfig', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t) })
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              if (e.status < 200 || e.status > 299) throw new Error(JSON.stringify(e));
              return e && e.length > 0 ? e : [];
            });
        },
        $ = t(74),
        _ = t.n($),
        K = (t(111), t(112), t(26)),
        X = { placeholder: 'Add mail address' },
        Y = { region: void 0, product: void 0, category: void 0 };
      function Z(e) {
        var a = Object(n.useState)(!1),
          t = Object(m.a)(a, 2),
          o = t[0],
          r = t[1],
          c = Object(n.useState)(!1),
          i = Object(m.a)(c, 2),
          u = i[0],
          g = i[1],
          d = Object(n.useState)(null),
          f = Object(m.a)(d, 2),
          b = f[0],
          v = f[1],
          p = Object(n.useState)([]),
          h = Object(m.a)(p, 2),
          E = h[0],
          y = h[1],
          C = Object(n.useState)(null),
          O = Object(m.a)(C, 2),
          j = O[0],
          N = O[1],
          M = Object(n.useState)(Y),
          x = Object(m.a)(M, 2),
          R = x[0],
          w = x[1];
        Object(n.useEffect)(function () {
          var a = k.a.parse(e.location.search);
          console.log('parsedQueryString: ', a), v(a);
        }, []);
        var L = function (e) {
          if (e.region && e.product && e.category) {
            var a = Object(s.a)({}, e);
            console.log('queryDynamo()', e),
              '<default>' === e.category && (a.category = void 0),
              g(!1),
              r(!0),
              N(null),
              y([]),
              Q(b.token, a)
                .then(function (e) {
                  console.log('we have got response !'),
                    console.log(e),
                    0 === e.length
                      ? ((a.category = void 0),
                        Q(b.token, a)
                          .then(function (e) {
                            g(!0), y(e[0].addresses), N(e[0]), r(!1);
                          })
                          .catch(function () {
                            K.NotificationManager.error('Failed to get configuration objects', 'Error', 3e3), r(!1);
                          }))
                      : (y(e[0].addresses), N(e[0]), r(!1));
                })
                .catch(function () {
                  K.NotificationManager.error('Failed to get configuration objects', 'Error', 3e3), r(!1);
                });
          }
        };
        return l.a.createElement(
          l.a.Fragment,
          null,
          l.a.createElement(
            J.a,
            { className: 'mt-5' },
            l.a.createElement(
              S.a,
              {
                outline: !0,
                size: 'xl',
                color: 'primary',
                className: 'mb-4',
                onClick: function () {
                  var e = '../../requests.html?region='.concat(b.region);
                  console.log('goBack()', e), window.location.replace(e);
                },
              },
              l.a.createElement(U.c, null),
              ' Return to previous page'
            ),
            l.a.createElement(I.a, null, l.a.createElement(B.a, null, l.a.createElement('h1', null, l.a.createElement(U.a, null), ' M.C.A.P (Mail Configuration Admin Page)'))),
            l.a.createElement('span', null, 'This configuration page allow to set email reciepments for requests that match Region, Product and Category combination.', l.a.createElement('br', null), 'Please note that this involves frontend and backend behaviour.'),
            l.a.createElement(
              I.a,
              { className: 'mt-4' },
              l.a.createElement(
                B.a,
                null,
                l.a.createElement(
                  'div',
                  { className: 'mb-3' },
                  'Region',
                  l.a.createElement(A.a, {
                    isDisabled: !1,
                    options: [
                      { value: 'EMEA', label: 'EMEA' },
                      { value: 'NA', label: 'NA' },
                      { value: 'LATAM', label: 'LATAM' },
                      { value: 'APAC', label: 'APAC' },
                    ],
                    isMulti: !1,
                    isSearchable: !1,
                    onChange: function (e) {
                      var a = Object(s.a)({}, R);
                      (a.region = e.value), w(a), L(a);
                    },
                  })
                )
              ),
              l.a.createElement(
                B.a,
                null,
                l.a.createElement(
                  'div',
                  { className: 'mb-3' },
                  'Product',
                  l.a.createElement(A.a, {
                    isDisabled: !1,
                    options: [
                      { value: 'Genesys Cloud', label: 'Genesys Cloud' },
                      { value: 'PureConnect', label: 'PureConnect' },
                      { value: 'Genesys Engage', label: 'Genesys Engage' },
                      { value: 'Genesys Engage Cloud', label: 'Genesys Engage Cloud' },
                      { value: 'Latitude by Genesys', label: 'Latitude by Genesys' },
                    ],
                    isMulti: !1,
                    isSearchable: !1,
                    onChange: function (e) {
                      var a = Object(s.a)({}, R);
                      (a.product = e.value), w(a), L(a);
                    },
                  })
                )
              ),
              l.a.createElement(
                B.a,
                null,
                l.a.createElement(
                  'div',
                  { className: 'mb-3' },
                  'Category',
                  l.a.createElement(A.a, {
                    isDisabled: !1,
                    options: [
                      { value: '<default>', label: '<default>' },
                      { value: 'Critical Situation Support', label: 'Critical Situation Support' },
                      { value: 'Customer Success Program', label: 'Customer Success Program' },
                      { value: 'Demo & Trial Support', label: 'Demo & Trial Support' },
                      { value: 'Enablement', label: 'Enablement' },
                      { value: 'Opportunity Support', label: 'Opportunity Support' },
                      { value: 'Privacy Support', label: 'Privacy Support' },
                      { value: 'Roadmap', label: 'Roadmap' },
                      { value: 'RR Extension', label: 'RR Extension' },
                      { value: 'Security Support', label: 'Security Support' },
                      { value: 'Specialist Engagement', label: 'Specialist Engagement' },
                      { value: 'Strategic Business Consulting', label: 'Strategic Business Consulting' },
                      { value: 'Other Request', label: 'Other Request' },
                    ],
                    isMulti: !1,
                    isSearchable: !1,
                    onChange: function (e) {
                      var a = Object(s.a)({}, R);
                      (a.category = e.value), w(a), L(a);
                    },
                  })
                )
              )
            ),
            l.a.createElement(I.a, null, l.a.createElement(B.a, null, l.a.createElement(z.a, { color: 'warning', hidden: !u }, 'There is no configuration for this combination. Default rules (Region + Product) applied. ', l.a.createElement('br', null), 'Once overwritten, new entry will be created.'))),
            l.a.createElement(
              I.a,
              null,
              l.a.createElement(
                B.a,
                null,
                l.a.createElement(_.a, {
                  value: E,
                  onChange: function (e) {
                    console.log(e), y(e);
                  },
                  inputProps: X,
                  validationRegex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  onlyUnique: !0,
                  disabled: !j,
                })
              ),
              l.a.createElement(W.a, { className: 'mt-2', color: 'primary', hidden: !o })
            ),
            l.a.createElement(
              I.a,
              null,
              l.a.createElement(
                B.a,
                null,
                l.a.createElement(
                  S.a,
                  {
                    outline: !0,
                    size: 'xl',
                    color: 'primary',
                    className: 'mt-4',
                    onClick: function () {
                      console.log('handleSave()'), r(!0);
                      var e,
                        a = Object(s.a)({}, j),
                        t = Object(s.a)({}, R);
                      (a.token = b.token),
                        (a.addresses = E),
                        console.log(a),
                        console.log('cf.category', t.category),
                        '<default>' !== t.category && void 0 === a.category && (console.log('prepare new object ...'), (a.id = H()()), (a.category = t.category)),
                        ((e = a),
                        console.log('updateMailConfiguration '.concat(JSON.stringify(e))),
                        fetch('http://localhost:3000/mailconfig', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(e) })
                          .then(function (e) {
                            return e.json();
                          })
                          .then(function (e) {
                            if (e.status < 200 || e.status > 299) throw new Error(JSON.stringify(e));
                            return e && e.length > 0 ? e : [];
                          }))
                          .then(function () {
                            console.log('saved !'), K.NotificationManager.success('Configuration updated', 'Success', 3e3), r(!1), g(!1);
                          })
                          .catch(function (e) {
                            console.error(e), K.NotificationManager.error('Failed to update configuration', 'Error', 3e3), r(!1);
                          });
                    },
                    disabled: !j,
                  },
                  l.a.createElement(U.b, null),
                  ' Apply'
                )
              ),
              l.a.createElement(B.a, null)
            ),
            l.a.createElement(K.NotificationContainer, null)
          )
        );
      }
      function ee(e) {
        return l.a.createElement('h1', null, 'Invalid URL');
      }
      var ae = function () {
        return l.a.createElement(c.a, null, l.a.createElement(i.a, { path: '/requestsfilter', component: q, exact: !0 }), l.a.createElement(i.a, { path: '/adminpage', component: Z, exact: !0 }), l.a.createElement(i.a, { path: '/', component: ee, exact: !0 }));
      };
      t(130), t(131);
      r.a.render(l.a.createElement(ae, null), document.getElementById('root'));
    },
    78: function (e, a, t) {
      e.exports = t(132);
    },
  },
  [[78, 1, 2]],
]);
//# sourceMappingURL=main.264d2567.chunk.js.map
