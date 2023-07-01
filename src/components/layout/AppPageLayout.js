import { styled } from 'styled-components';

const AppPageLayout = ({ left, right }) => {
  const Drawer = styled.div`
  overflow: hidden;
  display: flex;
  height: 100vh;
  `

  const Column1 = styled.div`
  flex: 1;
  background-color: gray;
  `

  const Column2 = styled.div`
  padding-left: 10px;
  flex: 10;
  /* background-color: white; */
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