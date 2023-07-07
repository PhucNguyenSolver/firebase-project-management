import styled from "styled-components"


const AppPageLayout = ({ left, right }) => {
  const Drawer = styled.div`
  overflow: auto;
  display: flex;
  height: 100vh;
  `

  const Column1 = styled.div`
  flex: 1;
  padding: 10px;
  background-color: gray;
  `

  const Column2 = styled.div`
  flex: 1;
  padding: 10px;
  background-color: white;
  `

  return (
    <Drawer>
      <Column1>
        {left}
      </Column1>

      <Column2>
        {right}
      </Column2>
    </Drawer>
  )
}

export default AppPageLayout