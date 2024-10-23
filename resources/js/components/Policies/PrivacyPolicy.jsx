import React, { useState } from 'react';
import { scroller } from 'react-scroll';
import { GlobalAppName } from '../..';


const PrivacyPolicy = () => {

    const [active_bk, setActiveBookmark] = useState('privacy__intro');

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
                                <a className={active_bk === 'privacy__intro' ? 'active_bk' : ''} onClick={() => scrollToBk('privacy__intro')}>INTRODUCTION</a>
                            </li>
                            <li>
                                <a className={active_bk === 'about_customer' ? 'active_bk' : ''} onClick={() => scrollToBk('about_customer')}>WHAT INFORMATION DO WE COLLECT?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'about_customer_user' ? 'active_bk' : ''} onClick={() => scrollToBk('about_customer_user')}>HOW DO WE PROCESS YOUR INFORMATION?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'personal_info' ? 'active_bk' : ''} onClick={() => scrollToBk('personal_info')}>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'about_your_data' ? 'active_bk' : ''} onClick={() => scrollToBk('about_your_data')}>DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'cookies_tracking' ? 'active_bk' : ''} onClick={() => scrollToBk('cookies_tracking')}>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'privacy_compailance' ? 'active_bk' : ''} onClick={() => scrollToBk('privacy_compailance')}>DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'data_transfer' ? 'active_bk' : ''} onClick={() => scrollToBk('data_transfer')}>HOW LONG DO WE KEEP YOUR INFORMATION?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'product_privacy' ? 'active_bk' : ''} onClick={() => scrollToBk('product_privacy')}>HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'security_information' ? 'active_bk' : ''} onClick={() => scrollToBk('security_information')}>DO WE COLLECT INFORMATION FROM MINORS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'handling_disputes' ? 'active_bk' : ''} onClick={() => scrollToBk('handling_disputes')}>WHAT ARE YOUR PRIVACY RIGHTS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'other_information' ? 'active_bk' : ''} onClick={() => scrollToBk('other_information')}>CONTROLS FOR DO-NOT-TRACK FEATURES</a>
                            </li>
                            <li>
                                <a className={active_bk === 'privacy_rights' ? 'active_bk' : ''} onClick={() => scrollToBk('privacy_rights')}>DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'notice_update' ? 'active_bk' : ''} onClick={() => scrollToBk('notice_update')}>DO WE MAKE UPDATES TO THIS NOTICE?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'contact_notice' ? 'active_bk' : ''} onClick={() => scrollToBk('contact_notice')}>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
                            </li>
                            <li>
                                <a className={active_bk === 'review_update' ? 'active_bk' : ''} onClick={() => scrollToBk('review_update')}>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='__page__content' role="article" style={{ hyphens: 'auto', overflowWrap: 'break-word', textAlign: 'justify' }}>
                <section name="privacy__intro">
                    {/* <div className='__thumbnail'>
                        <img src="/policies/privacy.jpg" />
                    </div> */}
                    {/* <div className='__heading'>PRIVACY POLICY</div> */}

                    <div className='__sub__intro'>
                        <p>
                            This Privacy Notice for Decypher ("<strong>we</strong>," "<strong>us</strong>," "<strong>or</strong>," "<strong>our</strong>") describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
                        </p>
                        <ul style={{ fontSize: '14px' }}>
                            <li>Visit our website at <a href="https://app.vitalerp.com">https://app.vitalerp.com</a>, or any website of ours that links to this Privacy Notice</li>
                            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                        </ul>
                        <p>
                            <strong>Questions or concerns? </strong>Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:privacy@vitalerp.com">privacy@vitalerp.com</a>.
                        </p>
                        <h4>SUMMARY OF KEY POINTS</h4>
                        <p>
                            This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
                        </p>


                        <p>
                            <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. <a href="#">Learn more about personal information you disclose to us.</a>
                        </p>
                        <p>
                            <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. <a href="#">Learn more about sensitive information we process.</a>
                        </p>
                        <p>
                            <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                        </p>
                        <p>
                            <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. <a href="#">Learn more about how we process your information.</a>
                        </p>
                        <p>
                            <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. <a href="#">Learn more about when and with whom we share your personal information.</a>
                        </p>

                        <p>
                            <strong>How do we keep your information safe? </strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. <a href="#">Learn more about how we keep your information safe.</a>
                        </p>

                        <p>
                            <strong>What are your rights? </strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. <a href="#">Learn more about your privacy rights.</a>
                        </p>

                        <p>
                            <strong>How do you exercise your rights? </strong>  The easiest way to exercise your rights is by visiting __________, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                        </p>

                        <p>
                            Want to learn more about what we do with any information we collect? <a href="#">Review the Privacy Notice in full.</a>
                        </p>
                        <h4><strong>TABLE OF CONTENTS</strong></h4>
                        <ol style={{ fontSize: '13px' }}>
                            {[
                                { id: 'privacy__intro', text: 'WHAT INFORMATION DO WE COLLECT?' },
                                { id: 'about_customer', text: 'HOW DO WE PROCESS YOUR INFORMATION?' },
                                { id: 'about_customer_user', text: 'WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?' },
                                { id: 'personal_info', text: 'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?' },
                                { id: 'about_your_data', text: 'DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?' },
                                { id: 'cookies_tracking', text: 'DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?' },
                                { id: 'privacy_compailance', text: 'HOW LONG DO WE KEEP YOUR INFORMATION?' },
                                { id: 'data_transfer', text: 'HOW DO WE KEEP YOUR INFORMATION SAFE?' },
                                { id: 'product_privacy', text: 'DO WE COLLECT INFORMATION FROM MINORS?' },
                                { id: 'security_information', text: 'WHAT ARE YOUR PRIVACY RIGHTS?' },
                                { id: 'handling_disputes', text: 'CONTROLS FOR DO-NOT-TRACK FEATURES' },
                                { id: 'other_information', text: 'DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?' },
                                { id: 'privacy_rights', text: 'DO WE MAKE UPDATES TO THIS NOTICE?' },
                                { id: 'notice_update', text: 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' },
                                { id: 'review_update', text: 'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?' }
                            ].map(({ id, text }) => (
                                <li key={id}>
                                    <a
                                        className={`${active_bk === id ? 'active_bk' : ''} link`}
                                        onClick={() => scrollToBk(id)}
                                        style={{
                                            color: 'blue',
                                            textDecoration: 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.textDecoration = 'underline';
                                            e.currentTarget.style.cursor = 'pointer';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.textDecoration = 'none';
                                        }}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ol>


                    </div>

                </section>

                <section name="about_customer">
                    <div className='__section__heading'>
                        WHAT INFORMATION DO WE COLLECT?
                    </div>
                    <p>
                        <strong>Personal information you disclose to us</strong>
                    </p>
                    <p>
                        <strong>In Short:</strong>We collect personal information that you provide to us.
                    </p>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </p>
                    <p>
                        <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                    </p>
                    <ul>
                        <li>Job titles</li>
                        <li>Usernames</li>
                        <li>Passwords</li>
                        <li>Email addresses</li>
                        <li>Phone numbers</li>
                        <li>Names</li>
                    </ul>
                    <p>
                        <strong>Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
                    </p>
                    <ul>
                        <li>Health data</li>
                        <li>Financial data</li>
                    </ul>
                    <p>
                        All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                    </p>
                    <p>
                        <strong>Information automatically collected</strong>
                    </p>
                    <p>
                        <strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                    </p>
                    <p>
                        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                    </p>
                    <p>
                        Like many businesses, we also collect information through cookies and similar technologies.
                    </p>
                    <p>
                        <strong>The information we collect includes:</strong>
                    </p>
                    <ul>
                        <li><strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</li>
                        <li><strong>Location Data.</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                    </ul>
                </section>

                <section name="about_customer_user">
                    <div className='__section__heading'>
                        HOW DO WE PROCESS YOUR INFORMATION?
                    </div>
                    <p>
                        <p><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                        <br />
                        <p><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
                        <ul>
                            <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                            <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
                        </ul>
                    </p>
                </section>
                <section name="personal_info">
                    <div className='__section__heading'>
                        WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
                    </div>
                    <p>
                        <p> <strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>

                        <p><strong> If you are located in the EU or UK, this section applies to you.</strong></p>

                        The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                        <ul>
                            <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about withdrawing your consent.</li>
                            <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                            <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                        </ul>
                    </p>
                </section>
                <section name="about_your_data">
                    <div className='__section__heading'>
                        WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                    </div>
                    <p>
                        <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
                    </p>
                    <p>
                        We may need to share your personal information in the following situations:
                    </p>
                    <ul>
                        <li>
                            <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                        </li>
                        <li>
                            <strong>Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                        </li>
                    </ul>
                </section>
                <section name="cookies_tracking">
                    <div className='__section__heading'>
                        DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </div>
                    <p>
                        <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
                    </p>
                    <p>
                        We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                    </p>
                    <p>
                        We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                    </p>
                    <p>
                        To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "<a href="#">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>"
                    </p>
                    <p>
                        Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                    </p>
                </section>
                <section name="privacy_compailance">
                    <div className='__section__heading'>
                        DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                    </div>
                    <p>
                        <strong>In Short:</strong> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.
                    </p>
                    <p>
                        As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, "AI Products"). These tools are designed to enhance your experience and provide you with innovative solutions. The terms in this Privacy Notice govern your use of the AI Products within our Services.
                    </p>
                    <div className='__subsection__heading'>
                        <strong>Use of AI Technologies</strong>
                    </div>
                    <p>
                        We provide the AI Products through third-party service providers ("AI Service Providers"), including OpenAI. As outlined in this Privacy Notice, your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products for purposes outlined in "<a href="#">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a>" You must not use the AI Products in any way that violates the terms or policies of any AI Service Provider.
                    </p>
                </section>
                <section name="data_transfer">
                    <div className='__section__heading'>
                        HOW LONG DO WE KEEP YOUR INFORMATION?
                    </div>
                    <p>
                        <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                    </p>
                    <p>
                        We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than twelve (12) months past the start of the idle period of the user's account.
                    </p>
                    <p>
                        When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </p>
                </section>
                <section name="product_privacy">
                    <div className='__section__heading'>
                        HOW DO WE KEEP YOUR INFORMATION SAFE?
                    </div>
                    <p>
                        <strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.
                    </p>
                    <p>
                        We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
                    </p>
                </section>
                <section name="security_information">
                    <div className='__section__heading'>
                        DO WE COLLECT INFORMATION FROM MINORS?
                    </div>
                    <p>
                        <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
                    </p>
                    <p>
                        We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:privacy@vitalerp.com">privacy@vitalerp.com</a>.
                    </p>
                </section>
                <section name="handling_disputes">
                    <div className='__section__heading'>
                        WHAT ARE YOUR PRIVACY RIGHTS?
                    </div>
                    <p>
                        <strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Switzerland, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
                    </p>
                    <p>
                        In some regions (like the EEA, UK, and Switzerland), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "<a href='#'> HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below.
                    </p>
                    <p>
                        We will consider and act upon any request in accordance with applicable data protection laws.
                    </p>
                    <p>
                        If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a href='#'>Member State data protection authority or UK data protection authority.</a>
                    </p>
                    <p>
                        If you are located in Switzerland, you may contact the <a href='#'>Federal Data Protection and Information Commissioner.</a>
                    </p>
                    <p>
                        <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "<a href='#'>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below.
                    </p>
                    <p>
                        However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                    </p>
                    <div className='__section__subheading'><strong>Account Information</strong></div>
                    <p>
                        If you would at any time like to review or change the information in your account or terminate your account, you can:
                    </p>
                    <ul>
                        <li>Contact us using the contact information provided.</li>
                    </ul>
                    <p>
                        Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                    </p>
                    <div className='__section__subheading'>Cookies and similar technologies</div>
                    <p>
                        Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.
                    </p>
                    <p>
                        If you have questions or comments about your privacy rights, you may email us at <a href="mailto:privacy@decypher.com">privacy@decypher.com</a>.
                    </p>
                </section>
                <section name="other_information">
                    <div className='__section__heading'>
                        CONTROLS FOR DO-NOT-TRACK FEATURES
                    </div>
                    <p>
                        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
                    </p>
                    <p>
                        California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
                    </p>
                </section>
                <section name="privacy_rights">
                    <div className='__section__heading'>
                        DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                    </div>
                    <p>
                        <strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.
                    </p>
                    <p>
                        <strong>Categories of Personal Information We Collect</strong>
                    </p>
                    <p>
                        We have collected the following categories of personal information in the past twelve (12) months:
                    </p>
                    {/* table */}
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Examples</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Collected</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>A. Identifiers</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>B. Personal information as defined in the California Customer Records statute</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Name, contact information, education, employment, employment history, and financial information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>YES</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>C. Protected classification characteristics under state or federal law</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>D. Commercial information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Transaction information, purchase history, financial details, and payment information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>E. Biometric information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Fingerprints and voiceprints</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>F. Internet or other similar network activity</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>G. Geolocation data</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Device location</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>H. Audio, electronic, sensory, or similar information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Images and audio, video or call recordings created in connection with our business activities</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>I. Professional or employment-related information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>YES</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>J. Education Information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Student records and directory information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>K. Inferences drawn from collected personal information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>NO</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}>L. Sensitive personal Information</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Account login information and health data</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>YES</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        We only collect sensitive personal information, as defined by applicable privacy laws or the purposes allowed by law or with your consent. Sensitive personal information may be used or disclosed to a service provider or contractor for additional, specified purposes. You may have the right to limit the use or disclosure of your sensitive personal information. We do not collect or process sensitive personal information for the purpose of inferring characteristics about you.
                    </p>

                    <div className='__section__heading'>
                        Additional Personal Information Collection
                    </div>
                    <p>
                        We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
                    </p>
                    <ul>
                        <li>Receiving help through our customer support channels;</li>
                        <li>Participation in customer surveys or contests;</li>
                        <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                    </ul>

                    <div className='__section__heading'>
                        Retention Periods for Collected Personal Information
                    </div>
                    <p>
                        We will use and retain the collected personal information as needed to provide the Services or for:
                    </p>
                    <ul>
                        <li><strong>Category B:</strong> As long as the user has an account with us</li>
                        <li><strong>Category H:</strong> As long as the user has an account with us</li>
                        <li><strong>Category I:</strong> 1 year</li>
                        <li><strong>Category L:</strong> 1 year</li>
                    </ul>
                    <p><strong>Sources of Personal Information</strong></p>
                    <p>
                        Learn more about the sources of personal information we collect in the section, "<a href='#'>WHAT INFORMATION DO WE COLLECT?</a>"
                    </p>

                    <p><strong>How We Use and Share Personal Information</strong></p>
                    <p>
                        Learn about how we use your personal information in the section, "<a href='#'>HOW DO WE PROCESS YOUR INFORMATION?</a>"
                    </p>

                    <p><strong>Will Your Information Be Shared with Anyone Else?</strong></p>
                    <p>
                        We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information in the section, "<a href='#'>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>"
                    </p>
                    <p>
                        We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
                    </p>
                    <p>
                        We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
                    </p>

                    <p><strong>Your Rights</strong></p>
                    <p>
                        You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:
                    </p>
                    <ul>
                        <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
                        <li><strong>Right to access</strong> your personal data</li>
                        <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
                        <li><strong>Right to request</strong> the deletion of your personal data</li>
                        <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
                        <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
                        <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California’s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
                    </ul>
                    <p>
                        Depending upon the state where you live, you may also have the following rights:
                    </p>
                    <ul>
                        <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including California's and Delaware's privacy law)</li>
                        <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including Oregon’s privacy law)</li>
                        <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including California’s privacy law)</li>
                        <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including Florida’s privacy law)</li>
                    </ul>

                    <p><strong>How to Exercise Your Rights</strong></p>
                    <p>
                        To exercise these rights, you can contact us by visiting __________, by emailing us at <a href='#'>privacy@decypher.com</a>, or by referring to the contact details at the bottom of this document.
                    </p>
                    <p>
                        Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.
                    </p>

                    <p><strong>Request Verification</strong></p>
                    <p>
                        Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.
                    </p>
                    <p>
                        If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.
                    </p>

                    <p><strong>Appeals</strong></p>
                    <p>
                        Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="#">privacy@decypher.com</a>. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.
                    </p>

                    <p><strong>  California "Shine The Light" Law</strong></p>
                    <p>
                        California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "<a href="#">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>"
                    </p>
                </section>

                <section name="notice_update">
                    <div className='__section__heading'>
                        DO WE MAKE UPDATES TO THIS NOTICE?
                    </div>
                    <p><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                    <p>
                        Yes, we will update this notice as necessary to stay compliant with relevant laws.
                        We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.
                        If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
                        We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
                    </p>
                </section>

                <section name="contact_notice">
                    <div className='__section__heading'>
                        CONTROLS FOR DO-NOT-TRACK FEATURES
                    </div>
                    <p>
                        If you have questions or comments about this notice, you may email us at
                        <a href="mailto:privacy@vitalerp.com"> privacy@vitalerp.com</a> or contact us by post at:
                    </p>
                    <address>
                        Decypher<br />
                        200 Concord Plaza<br />
                        Ste 780<br />
                        San Antonio, TX 78216<br />
                        United States
                    </address>
                </section>

                <section name="review_update">
                    <div className='__section__heading'>
                        HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                    </div>
                    <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: __________.</p>
                </section>

            </div >
        </div >
    );
}

export default PrivacyPolicy;