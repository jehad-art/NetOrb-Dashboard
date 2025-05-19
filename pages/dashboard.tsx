import Image from "next/image";
import { useEffect } from "react";
import '../styles/orb-style.css';
import type { AppProps } from 'next/app';


export default function Dashboard() {
  useEffect(() => {
    const deepCss = (who: HTMLElement, css: string) => {
      let val = "";
      if (who && who.style) {
        const sty = css.toLowerCase().replace(/\-([a-z])/g, (a, b) => b.toUpperCase());
        val = who.style[sty as any] as string;
        if (!val) {
          const dv = window;
          if (dv.getComputedStyle) {
            val = dv.getComputedStyle(who, '').getPropertyValue(css);
            const zombie = document.getElementById('zombie');
            if (zombie) {
              zombie.style.left = who.style.left;
              zombie.style.opacity = '1';
            }
            alert(who.style.left);
          } else if ((who as any).currentStyle) {
            val = (who as any).currentStyle[sty];
          }
        }
      }
      return val || '';
    };
  }, []);

  return (
    <div>
      <div className="top-bar">
        <table className="tbl" align="center">
          <tbody>
            <tr>
              <td>
                <img src="/Images/special-logo.png" style={{ width: "165px", height: "30px" }} />
              </td>
              <td style={{ width: "65%" }}></td>
              <td>
                <img src="/Images/menu.png" style={{ opacity: 0 }} />
              </td>
              <td>
                <img src="/Images/account3.png" style={{ width: "40px", height: "40px" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="address">
        <b>Network Orb:</b> Home &gt; <a href="#">Dashboard</a> &gt; <a href="#">Maps</a> &gt; <a href="#">Port configuration</a> &gt; <u>Automation</u>
      </div>

      <div className="the-body">
        <div className="switch-primary-box">
          <div className="help" >?</div>
          <table className="tbl" align="center">
            <tbody>
              <tr>
                <td style={{ height: "30px" }}>
                  <label>Cisco Catalyst 2960X-48TS-L Switch</label>
                </td>
              </tr>
              <tr>
                <td style={{ height: "60px" }}>
                  <div className="switch" id="switch">
                    <table className="tbl" border={0} style={{ width: "100%", border: "4px solid #fff" }}>
                      <tbody>
                        <tr>
                          <td>
                            <div className="blade">
                              <table className="tbl" style={{ border: "1px solid #555" }}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="port" style={{ backgroundImage: "url('/Images/port1.png')" }}></div>
                                    </td>
                                    <td>
                                      <div className="port" style={{ backgroundImage: "url('/Images/port1.png')" }}></div>
                                    </td>
                                    <td>
                                      <div className="port" style={{ backgroundImage: "url('/Images/port1.png')" }}></div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
