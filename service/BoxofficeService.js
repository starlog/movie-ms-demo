'use strict';


/**
 * 주간 박스오피스 영화 목록 
 * 주간 박스 오피스 영화 목록을 추출한다. 호출 설정에 따라 상세 내역의 포함 여부가 결정된다. 
 *
 * isDetailRequired String 상세 데이타를 포함하는지 여부 (y:포함, n:미포함) - 기본값 = n  (optional)
 * returns boxoffice
 **/
exports.getBoxoffice = function(isDetailRequired) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

