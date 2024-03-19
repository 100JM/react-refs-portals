React - ref & potal
===========

### Ref
>Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.   
>일반적인 React의 데이터 플로우에서 props는 부모 컴포넌트가 자식과 상호작용할 수 있는 유일한 수단입니다.   
>자식을 수정하려면 새로운 props를 전달하여 자식을 다시 렌더링해야 합니다.   
>그러나, 일반적인 데이터 플로우에서 벗어나 직접적으로 자식을 수정해야 하는 경우도 가끔씩 있습니다.   
>수정할 자식은 React 컴포넌트의 인스턴스일 수도 있고, DOM 엘리먼트일 수도 있습니다.   
>React는 두 경우 모두를 위한 해결책을 제공합니다.   
>**-React 공식홈페이지-**

바닐라 자바스크립트에선 특정 DOM을 선택하기 위해 querySelector, getElementById 등과 같은 함수를 사용한다.   
React를 사용하면서도 가끔 DOM을 직접 선택해야하는 상황이 필요한데 그럴때 **useRef** 라는 Reack Hook을 사용한다.   
예시를 들어보자 !
```jsx
import { useState } from "react";

export default function Player() {

  const [enteredName, setEnteredName] = useState(null);

  function handleClick(evt){
    setEnteredName(evt.target.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? 'unknown entity'}</h2>
      <p>
        <input type="text" onChange={(evt) => handleClick(evt)}/>
        <button >Set Name</button>
      </p>
    </section>
  );
}
```
input에서 입력 받은 값을 h2에 출력하려한다.   
state만을 사용하면 매번 값을 입력할때마다 setEnteredName함수로 인해 렌더링이 일어나고 실시간으로 h2에 출력값이 변경된다.   
![2024-03-19 13;44;34](https://github.com/100JM/react-refs-portals/assets/85985604/5f9becdd-1fe3-4d92-a3c9-b9cb9d47e1c9)   

이런 방식이 아니라 Set Name 버튼을 클릭시 출력되게끔 하고싶다면 useRef 훅을 사용하면 좋다.
```jsx
import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredName, setEnteredName] = useState(null);

  function handleClick(){
    setEnteredName(playerName.current.value);
    // playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```
useRef 훅을 import해서 참조 값을 생성한다.   
생성된 참조 값을 변수나 상수에 담고 이를 ref 속성을 통해 JSX요소들과 연결할 수 있다.   
current 속성이 연결된 JSX의 참조 값을 가지고있으며 위와 같이 input의 value 속성에 접근이 가능하다.   
결과를 확인해보면 **useRef로 관리하는 값은 변해도 더링되지 않음**을  수 있다.   
![2024-03-19 13;48;51](https://github.com/100JM/react-refs-portals/assets/85985604/5c88f352-4af3-4bed-9fb6-7db0a1e165b4)   

### State vs Ref
- state
1. 상태가 업데이트되면 컴포넌트가 렌더링된다.
2. UI에 바로 반영되어야 하는 값들이 있을 때 사용한다.
3. 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나 UI에 직접적인 영향을 끼치지 않는 값들에는 사용하지 않는다.

- ref
1. 참조 값이 바뀌었다는 이유로 컴포넌트가 렌더링되지 않는다.
2. DOM 요소에 직접적인 접근이 필요할 때 사용한다.
3. ref를 사용한 명령형 코드는 피하도록 조심해야한다.

### forwarRef
커스텀 컴포넌트는 ref속성이 존재하지 않아서 컴포넌트간 ref를 전달 받을 수 없다.   
상위 컴포넌트에서 하위 컴포넌트로 ref를 전달하고 싶을때에 forwardRef를 사용하면 가능하다.
```jsx
// 상위 컴포넌트
import { useRef } from "react";
import CustomInput from "./CustomInput"

const customRef = useRef();

function TopComponent() {
  return (
    <>
      <CustomInput name="peter" ref={customRef} />
    </>
  );
}

// 하위 컴포넌트
import { forwardRef } from "react";

const forwardCustomInput = forwardRef(function CustomInput({name}, ref) {
  return (
    <div>
      <input value={name} ref={ref} />
    </div>
  )
})

export default forwardCustomInput;
```
React에서 forwardRef를 import하고 forwardRef 함수로 컴포넌트 함수를 감싸준다.   
감싸진 컴포넌트 함수는 첫번째 인자로 props를 받고 두번째로 전달된 ref를 받아서 사용한다.

### Potal
>Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법을 제공합니다.   
>**-React 공식홈페이지-**

컴포넌트들의 상하 관계, 구조를 가지고 있는 DOM에서 자식 컴포넌트를 부모 컴포넌트 바깥에 있는 다른 컴포넌트에 전달할 수 있다는 뜻이다.   
주로 **index.html** 의 root div 외에 다른 곳에서 Modal, Dialog 등을 띄우기 위해 많이 사용한다.
```jsx
// index.html
<body>
  <div id="modal"></div>
  <div id="content">
    <div id="root"></div>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>

// modal 컴포넌트
import { createPortal } from "react-dom"

function CustomModal() {

    return createPortal(
        <dialog className="result-modal">
            <h2>My name is Peter parker</h2>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}

export default CustomModal;
```
React DOM 라이브러리에서 createPortal을 import하고 JSX코드를 감싸준다.   
두번째 인자로는 JSX코드의 부모가 될 DOM node를 선택해준다.   
![스크린샷 2024-03-19 153305](https://github.com/100JM/react-refs-portals/assets/85985604/3cf9b790-25fd-4847-8d11-896c915e5d82)   
선택한 node로 modal 컴포넌트가 이동된 것을 확인할 수있다.
