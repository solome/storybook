import * as React from "react";

import "./index.scss";

/**
 * 通常情况下 DOM 树是按照二维平面的渲染逻辑进行的，但是纯 DOM 也支持些强大的 3D 空间效果的渲染。
 *
 * [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 属性 `transform-style` 可以设置元素的子元素是位于 3D 空间中还是平面中。
 *
 *
 * @returns
 */
export default function CSS3DCube() {
  return (
    <div className="Cube">
      <ul className="Cube-wrapper">
        <li className="Cube-plane">金</li>
        <li className="Cube-plane">木</li>
        <li className="Cube-plane">水</li>
        <li className="Cube-plane">火</li>
        <li className="Cube-plane">土</li>
        <li className="Cube-plane">掬</li>
        <li className="Cube-plane">我风尘仆仆地来了，你却轻轻地走了</li>
      </ul>
    </div>
  );
}
