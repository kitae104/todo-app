import PropTypes from "prop-types";

export default function CounterButton({ by,
    incrementMethod,
    decrementMethod,
}) {

  return (
    <div className="Counter">
      <div>
        <button className="countButton" onClick={() => incrementMethod(by)}>
          +{by}
        </button>
        <button className="countButton" onClick={() => decrementMethod(by)}>
          -{by}
        </button>
      </div>
    </div>
  );
}

CounterButton.propTypes = {
  // PropTypes는 컴포넌트의 props를 정의하거나 검증할 때 사용
  by: PropTypes.number, // by props는 number 타입이어야 한다.
};

CounterButton.defaultProps = {
  // defaultProps는 props의 기본값을 정의할 때 사용
  by: 1, // by props의 기본값은 1이다.
};
