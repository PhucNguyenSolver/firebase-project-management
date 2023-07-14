import styled from "styled-components"

let backgroundColor = "#f0f0f0"
let modalColor = undefined
// modalColor = "pink" // for testing only


export function HStack({ left, right }) {
  const direction = "row"

  const Container = styled.div`
  background-color: ${backgroundColor};
  display: flex;
  flex-direction: ${direction};
  height: 100vh;
width: 100vw;
  overflow: hidden;
  `

  const Column1 = styled.div`
  margin: 10px;
  `

  const Column2 = styled.div`
  flex: 1;
  flex-grow: 7;
  min-width: 0; // this solved the issue: stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container
  box-sizing: border-box;
  margin: 10px;
  background-color: black;
  `

  return (
    <Container>
      <Column1>
        {left}
      </Column1>
      <Column2>
        {right}
      </Column2>
    </Container>
  )
}

export function VStack({ left: top, right: bottom }) {
  const Container2 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${backgroundColor};
  `

  const Row = styled.div`
  height: 100px;
  margin-bottom: 10px;
  `

  const RowExtend = styled.div`
  background-color: ${modalColor};
  flex: 1;
  `

  // bottom = <MockContent />
  return (
    <Container2>
      <Row>
        {top}
      </Row>
      <RowExtend>
        {bottom}
      </RowExtend>
    </Container2>
  )
}

export function MockContent() {
  return <div
    style={{
      backgroundColor: "pink",
      height: "100%",
      width: "100%",
    }}
  >
    mock content
  </div>
}

export const HScrollView = ({ children }) => {
  return (
    <div
      style={{
        height: '100%',
        overflow: 'hidden',
        overflowX: 'auto',
      }}
    >
      {children}
    </div>
  );
};