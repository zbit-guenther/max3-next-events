import { PropsWithChildren } from "react";
import { MainHeader } from './MainHeader'

interface Props {}
export const Layout = ({ children }: PropsWithChildren<Props>) => {
return (
  <>
    <MainHeader />
    <main>{children}</main>
  </>
)

}