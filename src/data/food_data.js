import * as d3 from 'd3';
let key = '1-y0RKyaYHCBK1mxT4mnhygGpy7wSFp3jYHk6lQNmKBg';
// let path = `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv`;
let path = "https://docs.google.com/spreadsheets/d/1-y0RKyaYHCBK1mxT4mnhygGpy7wSFp3jYHk6lQNmKBg/gviz/tq?tqx=out:csv";

export let data = [];

d3.csv(path).then((d) => {
   data = d;
})




