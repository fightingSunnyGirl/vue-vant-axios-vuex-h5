// 金钱格式
export function moneyFormat(value) {
  var str = '';
  for(var k in arguments){
    str += (arguments[k]/100).toFixed(2)+' ';
  }
  return str.trim();
}

//商品颜色规格转换
export function colorTranformFormat(value) {
  if(!value) return '任意规格';
  return value.split('@@').join(',');
}

// 隐藏格式
export function spaceFormat(value) {
  if(!value) return '无';
  var str = '';
  for(var k in arguments){
    str += (arguments[k].substr(0,1)+'***'+arguments[k].substr(arguments[k].length-2,2))+' '
  }
  return str.trim();
}
