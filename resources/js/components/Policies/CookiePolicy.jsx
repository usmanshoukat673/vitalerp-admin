import React, { useState } from 'react';
import { scroller } from 'react-scroll';
import { GlobalAppName } from '../..';


const CookiePolicy = () => {

    const [active_bk, setActiveBookmark] = useState('cookie__intro');

    const scrollToBk = (name) => {
        setActiveBookmark(name);
        scroller.scrollTo(name, {
            duration: 50,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -96
        });
    }

    return (
        <div className='__policy__page' style={{ marginTop: '0', paddingTop: '0' }}>
            <div className='__page_bookmarks' role="navigation" style={{ marginTop: '20px' }}>
                <div>
                    <div>
                        <ul>
                            <li>
                                <a className={active_bk === 'cookie__intro' ? 'active_bk' : ''} onClick={() => scrollToBk('cookie__intro')}>INTRODUCTION</a>
                            </li>
                            <li>
                                <a className={active_bk === 'what_are_cookie' ? 'active_bk' : ''} onClick={() => scrollToBk('what_are_cookie')}>WHAT ARE COOKIES?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'use_cookie' ? 'active_bk' : ''} onClick={() => scrollToBk('use_cookie')}>WHY DO WE USE COOKIES?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'control_cookie' ? 'active_bk' : ''} onClick={() => scrollToBk('control_cookie')}>HOW CAN I CONTROL COOKIES?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'control_cookie_on_browser' ? 'active_bk' : ''} onClick={() => scrollToBk('control_cookie_on_browser')}>HOW CAN I CONTROL COOKIES ON MY BROWSER?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'cookies_tracking' ? 'active_bk' : ''} onClick={() => scrollToBk('cookies_tracking')}>WHAT ABOUT OTHER TRACKING TECHNOLOGIES, LIKE WEB BEACONS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'flash_cookie' ? 'active_bk' : ''} onClick={() => scrollToBk('flash_cookie')}>DO YOU USE FLASH COOKIES OR LOCAL SHARED OBJECTS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'targeted_advertising' ? 'active_bk' : ''} onClick={() => scrollToBk('targeted_advertising')}>DO YOU SERVE TARGETED ADVERTISING?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'often_update_cookie' ? 'active_bk' : ''} onClick={() => scrollToBk('often_update_cookie')}>HOW OFTEN WILL YOU UPDATE THIS COOKIE POLICY?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'further_information' ? 'active_bk' : ''} onClick={() => scrollToBk('further_information')}>WHERE CAN I GET FURTHER INFORMATION?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='__page__content' role="article" style={{ hyphens: 'auto', overflowWrap: 'break-word', textAlign: 'justify' }}>
                <section name="cookie__intro">
                    <div className='__sub__intro'>
                        <p>
                        This Cookie Policy explains how Decypher ("<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," "<strong>or</strong>," "<strong>our</strong>") uses cookies and similar technologies to recognize you when you visit our website at <a href="https://app.vitalerp.com">https://app.vitalerp.com</a>("<strong>Website</strong>"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                        </p>
                    </div>
                </section>

                <section name="what_are_cookie">
                    <div className='__section__heading'>
                        WHAT ARE COOKIES?
                    </div>
                    <div className="__sub__content">
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>
                        <p>
                            Cookies set by the website owner (in this case, <strong>Decypher</strong>) are called "<strong>first-party cookies</strong>." Cookies set by parties other than the website owner are called "<strong>third-party cookies</strong>." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                        </p>
                    </div>
                </section>

                <section name="use_cookie">
                    <div className='__section__heading'>
                        WHY DO WE USE COOKIES?
                    </div>
                    <div className="__sub__content">
                        <p>
                            We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "<strong>essential</strong>" or "<strong>strictly necessary</strong>" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
                        </p>
                        <p>
                            Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
                        </p>
                    </div>
                </section>
                <section name="control_cookie">
                    <div className='__section__heading'>
                        HOW CAN I CONTROL COOKIES?
                    </div>
                    <div className="__sub__content">
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the <strong>Cookie Consent Manager</strong>. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                        </p>
                        <p>
                            The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
                        </p>
                        <p>
                            The specific types of first- and third-party cookies served through our Website and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):
                        </p>

                        <p><strong><u>Performance and functionality cookies:</u></strong></p>
                        <p>These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p>
                        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>XSRF-TOKEN</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Purpose:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>This cookie is written to help with site security in preventing Cross-Site Request Forgery attacks.</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Service:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>Advertiser's website domain<a href="https://app.termly.io/dashboard/website/2090f6d8-3186-4be9-b364-7a84f7b47aac/None">View Service Privacy Policy</a></td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>server_cookie</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>2 hours</td>
                                </tr>
                            </tbody>
                        </table>


                        <p><strong><u>Unclassified cookies:</u></strong></p>
                        <p>These are cookies that have not yet been categorized. We are in the process of classifying these cookies with the help of their providers.</p>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>is_visitor_unique</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>.statcounter.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>server_cookie</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>session</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>statcounter_session</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>html_session_storage</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>session</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>sc_medium_source</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>html_local_storage</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>persistent</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>statcounter_config</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>html_session_storage</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>session</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>statcounter_bounce</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>html_session_storage</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>session</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>is_unique</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>.statcounter.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>server_cookie</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>session</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>vitalerp_session</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>server_cookie</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>2 hours</td>
                                </tr>

                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Name:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>sc_is_visitor_unique</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Provider:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>.app.vitalerp.com</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Type:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>http_cookie</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px' }}><strong>Expires In:</strong></td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>1 year 1 month 4 days</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </section>
                <section name="control_cookie_on_browser">
                    <div className='__section__heading'>
                        HOW CAN I CONTROL COOKIES ON MY BROWSER?
                    </div>
                    <div className="__sub__content">
                        <p>
                            As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:
                        </p>
                        <ul>
                            <li><a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank">Chrome</a></li>
                            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank">Internet Explorer</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank">Firefox</a></li>
                            <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank">Edge</a></li>
                            <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank">Opera</a></li>
                        </ul>
                        <p>
                            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
                        </p>
                        <ul>
                            <li><a href="http://www.aboutads.info/choices/" target="_blank">Digital Advertising Alliance</a></li>
                            <li><a href="https://youradchoices.ca/" target="_blank">Digital Advertising Alliance of Canada</a></li>
                            <li><a href="http://www.youronlinechoices.com/" target="_blank">European Interactive Digital Advertising Alliance</a></li>
                        </ul>
                    </div>
                </section>
                <section name="cookies_tracking">
                    <div className='__section__heading'>
                        WHAT ABOUT OTHER TRACKING TECHNOLOGIES, LIKE WEB BEACONS?
                    </div>
                    <div className="__sub__content">
                        <p>
                            Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them.
                        </p>
                        <p>
                            This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
                        </p>
                    </div>
                </section>
                <section name="flash_cookie">
                    <div className='__section__heading'>
                        DO YOU USE FLASH COOKIES OR LOCAL SHARED OBJECTS?
                    </div>
                    <div className="__sub__content">
                        <p>
                            Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.
                        </p>
                        <p>
                            If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html#_blank">Website Storage Settings Panel</a>. You can also control Flash Cookies by going to the <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html#_blank">Global Storage Settings Panel</a> and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to as "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).
                        </p>
                        <p>
                            Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.
                        </p>
                    </div>
                </section>
                <section name="targeted_advertising">
                    <div className='__section__heading'>
                        DO YOU SERVE TARGETED ADVERTISING?
                    </div>
                    <div className="__sub__content">
                        <p>
                            Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.
                        </p>
                        <p>
                            They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.
                        </p>
                    </div>
                </section>
                <section name="often_update_cookie">
                    <div className='__section__heading'>
                        HOW OFTEN WILL YOU UPDATE THIS COOKIE POLICY?
                    </div>
                    <div className="__sub__content">
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                        <p>
                            The date at the top of this Cookie Policy indicates when it was last updated.
                        </p>
                    </div>
                </section>
                <section name="further_information">
                    <div className='__section__heading'>
                        WHERE CAN I GET FURTHER INFORMATION?
                    </div>
                    <div className="__sub__content">
                        <p>
                            If you have any questions about our use of cookies or other technologies, please contact us at:
                        </p>
                        <address>
                            Decypher<br />
                            200 Concord Plaza<br />
                            San Antonio, TX 78216<br />
                            United States<br />
                            Phone: <a href="tel:+12107359900">210-735-9900</a>
                        </address>
                    </div>
                </section>
            </div >
        </div >
    );
}

export default CookiePolicy;