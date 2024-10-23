import React, { useState } from 'react';
import { scroller } from 'react-scroll';

const TermsCondictions = () => {

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
                                <a className={active_bk === 'services' ? 'active_bk' : ''} onClick={() => scrollToBk('services')}>OUR SERVICES</a>
                            </li>
                            <li>
                                <a className={active_bk === 'intellectual_property' ? 'active_bk' : ''} onClick={() => scrollToBk('intellectual_property')}>INTELLECTUAL PROPERTY RIGHTS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'user_representations' ? 'active_bk' : ''} onClick={() => scrollToBk('user_representations')}>USER REPRESENTATIONS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'prohibited_activities' ? 'active_bk' : ''} onClick={() => scrollToBk('prohibited_activities')}>PROHIBITED ACTIVITIES</a>
                            </li>
                            <li>
                                <a className={active_bk === 'user_generated_contributions' ? 'active_bk' : ''} onClick={() => scrollToBk('user_generated_contributions')}>USER GENERATED CONTRIBUTIONS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'contribution_license' ? 'active_bk' : ''} onClick={() => scrollToBk('contribution_license')}>CONTRIBUTION LICENSE</a>
                            </li>
                            <li>
                                <a className={active_bk === 'third_party_content' ? 'active_bk' : ''} onClick={() => scrollToBk('third_party_content')}>THIRD-PARTY WEBSITES AND CONTENT</a>
                            </li>
                            <li>
                                <a className={active_bk === 'services_management' ? 'active_bk' : ''} onClick={() => scrollToBk('services_management')}>SERVICES MANAGEMENT</a>
                            </li>
                            <li>
                                <a className={active_bk === 'privacy_policy' ? 'active_bk' : ''} onClick={() => scrollToBk('privacy_policy')}>PRIVACY POLICY</a>
                            </li>
                            <li>
                                <a className={active_bk === 'copyright_infringements' ? 'active_bk' : ''} onClick={() => scrollToBk('copyright_infringements')}>COPYRIGHT INFRINGEMENTS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'term_and_termination' ? 'active_bk' : ''} onClick={() => scrollToBk('term_and_termination')}>ERM AND TERMINATION</a>
                            </li>
                            <li>
                                <a className={active_bk === 'modifications_interruptions' ? 'active_bk' : ''} onClick={() => scrollToBk('modifications_interruptions')}>MODIFICATIONS AND INTERRUPTIONS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'governing_law' ? 'active_bk' : ''} onClick={() => scrollToBk('governing_law')}>GOVERNING LAW</a>
                            </li>
                            <li>
                                <a className={active_bk === 'dispute_resolution' ? 'active_bk' : ''} onClick={() => scrollToBk('dispute_resolution')}>DISPUTE RESOLUTION</a>
                            </li>
                            <li>
                                <a className={active_bk === 'corrections' ? 'active_bk' : ''} onClick={() => scrollToBk('corrections')}>CORRECTIONS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'disclaimer' ? 'active_bk' : ''} onClick={() => scrollToBk('disclaimer')}>DISCLAIMER</a>
                            </li>
                            <li>
                                <a className={active_bk === 'limitations_of_liability' ? 'active_bk' : ''} onClick={() => scrollToBk('limitations_of_liability')}>LIMITATIONS OF LIABILITY</a>
                            </li>
                            <li>
                                <a className={active_bk === 'indemnification' ? 'active_bk' : ''} onClick={() => scrollToBk('indemnification')}>INDEMNIFICATION</a>
                            </li>
                            <li>
                                <a className={active_bk === 'user_data' ? 'active_bk' : ''} onClick={() => scrollToBk('about_customer_user')}>USER DATA</a>
                            </li>
                            <li>
                                <a className={active_bk === 'electronic_communications' ? 'active_bk' : ''} onClick={() => scrollToBk('electronic_communications')}>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a>
                            </li>
                            <li>
                                <a className={active_bk === 'sms_text_messaging' ? 'active_bk' : ''} onClick={() => scrollToBk('sms_text_messaging')}>SMS TEXT MESSAGING</a>
                            </li>
                            <li>
                                <a className={active_bk === 'california_users' ? 'active_bk' : ''} onClick={() => scrollToBk('california_users')}>CALIFORNIA USERS AND RESIDENTS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'miscellaneous' ? 'active_bk' : ''} onClick={() => scrollToBk('miscellaneous')}>MISCELLANEOUS</a>
                            </li>
                            <li>
                                <a className={active_bk === 'contact_us' ? 'active_bk' : ''} onClick={() => scrollToBk('contact_us')}>CONTACT US</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            {/* contents of angrement */}
            <div className='__page__content' role="article" style={{ hyphens: 'auto', overflowWrap: 'break-word', textAlign: 'justify' }}>

                <section name="services">
                    <div className='__sub__intro'>
                        <h3 style={{ fontWeight: 'bold' }}>AGREEMENT TO OUR LEGAL TERMS</h3>

                        <p>
                            We are <strong>Decypher</strong> ("<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," "<strong>our</strong>"), a company registered in Texas, United States at 200 Concord Plaza, San Antonio, TX 78216.
                        </p>
                        <p>
                            We operate the website <a href="https://app.vitalerp.com" target="_blank" rel="noopener noreferrer">https://app.vitalerp.com</a> (the "<strong>Site</strong>"), as well as any other related products and services that refer or link to these legal terms (the "<strong>Legal Terms</strong>") (collectively, the "<strong>Services</strong>").
                        </p>
                        <p>
                            You can contact us by phone at <a href="tel:210-735-9900">210-735-9900</a>, email at <a href="mailto:contact@vitalerp.com">contact@vitalerp.com</a>, or by mail to 200 Concord Plaza, San Antonio, TX 78216, United States.
                        </p>

                        <p>
                            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Decypher concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
                        </p>

                        <p>
                            We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by <a href="mailto:no-reply@vitalerp.com">no-reply@vitalerp.com</a>, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
                        </p>

                        <p>
                            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                        </p>

                        <p>
                            We recommend that you print a copy of these Legal Terms for your records.
                        </p>
                        {/* TABLE OF CONTENTS */}
                        <h4>TABLE OF CONTENTS</h4>
                        <ol style={{ fontSize: '13px' }}>
                            {[
                                { id: 'services', text: 'OUR SERVICES' },
                                { id: 'intellectual_property', text: 'INTELLECTUAL PROPERTY RIGHTS' },
                                { id: 'user_representations', text: 'USER REPRESENTATIONS' },
                                { id: 'prohibited_activities', text: 'PROHIBITED ACTIVITIES' },
                                { id: 'user_generated_contributions', text: 'USER GENERATED CONTRIBUTIONS' },
                                { id: 'contribution_license', text: 'CONTRIBUTION LICENSE' },
                                { id: 'third_party_content', text: 'THIRD-PARTY WEBSITES AND CONTENT' },
                                { id: 'services_management', text: 'SERVICES MANAGEMENT' },
                                { id: 'privacy_policy', text: 'PRIVACY POLICY' },
                                { id: 'copyright_infringements', text: 'COPYRIGHT INFRINGEMENTS' },
                                { id: 'term_and_termination', text: 'TERM AND TERMINATION' },
                                { id: 'modifications_interruptions', text: 'MODIFICATIONS AND INTERRUPTIONS' },
                                { id: 'governing_law', text: 'GOVERNING LAW' },
                                { id: 'dispute_resolution', text: 'DISPUTE RESOLUTION' },
                                { id: 'corrections', text: 'CORRECTIONS' },
                                { id: 'disclaimer', text: 'DISCLAIMER' },
                                { id: 'limitations_of_liability', text: 'LIMITATIONS OF LIABILITY' },
                                { id: 'indemnification', text: 'INDEMNIFICATION' },
                                { id: 'about_customer_user', text: 'USER DATA' },
                                { id: 'electronic_communications', text: 'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES' },
                                { id: 'sms_text_messaging', text: 'SMS TEXT MESSAGING' },
                                { id: 'california_users', text: 'CALIFORNIA USERS AND RESIDENTS' },
                                { id: 'miscellaneous', text: 'MISCELLANEOUS' },
                                { id: 'contact_us', text: 'CONTACT US' },
                            ].map(({ id, text }) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToBk(id); // Call scroll function test
                                        }}
                                        style={{ color: 'blue', textDecoration: 'none' }}
                                        onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ol>

                        <strong>OUR SERVICES</strong>
                        <p>
                            The information provided when using the Services is not intended for distribution to or use by any person or entity
                            in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would
                            subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose
                            to access the Services from other locations do so on their own initiative and are solely responsible for compliance
                            with local laws, if and to the extent local laws are applicable.
                        </p>
                        <p>
                            The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability
                            Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to
                            such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                        </p>
                    </div>

                </section>

                <section name="intellectual_property">
                    <div className='__section__heading'>
                        INTELLECTUAL PROPERTY RIGHTS
                    </div>
                    <p><strong>Our intellectual property</strong></p>
                    <p>
                        We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases,
                        functionality, software, website designs, audio, video, text, photographs, and graphics in the Services
                        (collectively, the "<strong>Content</strong>"), as well as the trademarks, service marks, and logos contained therein
                        (the "<strong>Marks</strong>").
                    </p>
                    <p>
                        Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights
                        and unfair competition laws) and treaties in the United States and around the world.
                    </p>
                    <p>
                        The Content and Marks are provided in or through the Services "<strong>AS IS</strong>" for your personal, non-commercial use
                        or internal business purpose only.
                    </p>

                    <p><strong>YOUR USE OF OUR SERVICES</strong></p>
                    <p>
                        Subject to your compliance with these Legal Terms, including the "<strong>PROHIBITED ACTIVITIES</strong>" section below,
                        we grant you a non-exclusive, non-transferable, revocable license to access the Services.
                    </p>
                    <p>
                        Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks
                        may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated,
                        transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our
                        express prior written permission.
                    </p>
                    <p>
                        If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our
                        Legal Terms, please address your request to: <a href="mailto:contact@vitalerp.com" >contact@vitalerp.com</a>.
                        If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must
                        identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary
                        notice appears or is visible on posting, reproducing, or displaying our Content.
                    </p>
                    <p>
                        We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
                    </p>
                    <p>
                        Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right
                        to use our Services will terminate immediately.
                    </p>
                    <p><strong>Your submissions and contributions</strong></p>
                    <p>
                        Please review this section and the "<strong>PROHIBITED ACTIVITIES</strong>" section carefully prior to using our Services to understand
                        the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
                    </p>

                    <p>
                        <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("<strong>Submissions</strong>"),
                        you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its
                        unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                    </p>

                    <p>
                        <strong>Contributions:</strong>The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may
                        create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited
                        to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material
                        ("<strong>Contributions</strong>"). Any Submission that is posted shall also be treated as a Contribution.
                    </p>
                    <p>
                        You understand that Contributions may be viewable by other users of the Services.
                    </p>
                    <p>
                        <strong>When you post Contributions, you grant us a license (including use of your name, trademarks, and logos):</strong> By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section. Our use and distribution may occur in any media formats and through any media channels.
                    </p>
                    <p>This license includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.</p>
                    <p><strong>You are responsible for what you post or upload: </strong>By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services you:</p>
                    <ul>
                        <li>
                            confirm that you have read and agree with our "<strong>PROHIBITED ACTIVITIES</strong>" and will not post, send, publish, upload, or transmit
                            through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying,
                            abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;
                        </li>
                        <li>
                            to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution;
                        </li>
                        <li>
                            warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licenses to submit such Submissions
                            and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and
                        </li>
                        <li>
                            warrant and represent that your Submissions and/or Contributions do not constitute confidential information.
                        </li>
                    </ul>
                    <p>
                        You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer
                        because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.
                    </p>

                    <p>
                        <strong>We may remove or edit your Content:</strong> Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice
                        if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions,
                        we may also suspend or disable your account and report you to the authorities.
                    </p>

                    <strong>Copyright infringement</strong>
                    <p>
                        We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any
                        copyright you own or control, please immediately refer to the "<strong>COPYRIGHT INFRINGEMENTS</strong>" section below.
                    </p>

                </section>
                <section name="user_representations">
                    <div className='__section__heading'>
                        USER REPRESENTATIONS
                    </div>
                    <p>
                        By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.</p>
                    <p>
                        If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                    </p>

                </section>

                <section name="prohibited_activities">
                    <div className='__section__heading'>
                        PROHIBITED ACTIVITIES
                    </div>
                    <p>
                        You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                    <strong>YOU AGREE NOT TO:</strong>
                    <ul>
                        <li>
                            Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database,
                            or directory without written permission from us.
                        </li>
                        <li>
                            Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
                        </li>
                        <li>
                            Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or
                            copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.
                        </li>
                        <li>
                            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
                        </li>
                        <li>
                            Use any information obtained from the Services in order to harass, abuse, or harm another person.
                        </li>
                        <li>
                            Make improper use of our support services or submit false reports of abuse or misconduct.
                        </li>
                        <li>
                            Use the Services in a manner inconsistent with any applicable laws or regulations.
                        </li>
                        <li>
                            Engage in unauthorized framing of or linking to the Services.
                        </li>
                        <li>
                            Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters
                            and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies,
                            impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.
                        </li>
                        <li>
                            Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data
                            gathering and extraction tools.
                        </li>
                        <li>
                            Delete the copyright or other proprietary rights notice from any Content.
                        </li>
                        <li>
                            Attempt to impersonate another user or person or use the username of another user.
                        </li>
                        <li>
                            Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission
                            mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices
                            (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").
                        </li>
                        <li>
                            Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.
                        </li>
                        <li>
                            Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.
                        </li>
                        <li>
                            Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.
                        </li>
                        <li>
                            Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
                        </li>
                        <li>
                            Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making
                            up a part of the Services.
                        </li>
                        <li>
                            Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system,
                            including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any
                            unauthorized script or other software.
                        </li>
                        <li>
                            Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for
                            the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
                        </li>
                        <li>
                            Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor
                            or commercial enterprise.
                        </li>
                    </ul>
                </section>
                <section name="user_generated_contributions">
                    <div className='__section__heading'>
                        USER GENERATED CONTRIBUTIONS
                    </div>
                    <p>
                        The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide
                        you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the
                        Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other
                        material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any
                        Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby
                        represent and warrant that:
                    </p>
                    <ul>
                        <li>
                            The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not
                            and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any
                            third party.
                        </li>
                        <li>
                            You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services,
                            and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.
                        </li>
                        <li>
                            You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or
                            likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the
                            Services and these Legal Terms.
                        </li>
                        <li>
                            Your Contributions are not false, inaccurate, or misleading.
                        </li>
                        <li>
                            Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or
                            other forms of solicitation.
                        </li>
                        <li>
                            Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
                        </li>
                        <li>
                            Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
                        </li>
                        <li>
                            Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific
                            person or class of people.
                        </li>
                        <li>
                            Your Contributions do not violate any applicable law, regulation, or rule.
                        </li>
                        <li>
                            Your Contributions do not violate the privacy or publicity rights of any third party.
                        </li>
                        <li>
                            Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
                        </li>
                        <li>
                            Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
                        </li>
                        <li>
                            Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.
                        </li>
                    </ul>
                    <p>
                        Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your
                        rights to use the Services.
                    </p>
                </section>

                <section name="contribution_license">
                    <div className='__section__heading'>
                        CONTRIBUTION LICENSE
                    </div>
                    <p>
                        By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an
                        unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy,
                        reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit,
                        excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising,
                        or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.
                        The use and distribution may occur in any media formats and through any media channels.
                    </p>
                    <p>
                        This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise
                        name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in
                        your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
                    </p>
                    <p>
                        We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other
                        proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area
                        on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and
                        to refrain from any legal action against us regarding your Contributions.
                    </p>
                    <p>
                        We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to
                        place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice.
                        We have no obligation to monitor your Contributions.
                    </p>
                </section>

                <section name="third_party_content">
                    <div className='__section__heading'>
                        THIRD-PARTY WEBSITES AND CONTENT
                    </div>
                    <p>
                        The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics,
                        pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties
                        ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or
                        completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available
                        through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or
                        contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites
                        or any Third-Party Content does not imply approval or endorsement thereof by us.
                    </p>
                    <p>
                        If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should
                        be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website
                        to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites
                        will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you
                        and the applicable third party.
                    </p>
                    <p>
                        You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused
                        by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or
                        resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
                    </p>
                </section>

                <section name="services_management">
                    <div className='__section__heading'>
                        SERVICES MANAGEMENT
                    </div>
                    <p>
                        We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.


                    </p>
                </section>

                <section name="privacy_policy">
                    <div className='__section__heading'>
                        PRIVACY POLICY
                    </div>
                    <p>
                        We care about data privacy and security. Please review our Privacy Policy: <strong>privacy policy link</strong>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
                    </p>
                </section>

                <section name="copyright_infringements">
                    <div className='__section__heading'>
                        COPYRIGHT INFRINGEMENTS
                    </div>
                    <p>

                        We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a "Notification"). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.

                    </p>
                </section>

                <section name="term_and_termination">
                    <div className='__section__heading'>
                        TERM AND TERMINATION
                    </div>
                    <p>
                        These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                    </p>
                    <p>
                        If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                    </p>
                </section>

                <section name="modifications_interruptions">
                    <div className='__section__heading'>
                        <div className='__section__heading'>
                            MODIFICATIONS AND INTERRUPTIONS
                        </div>
                        <p>
                            We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                        </p>
                        <p>
                            We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
                        </p>
                    </div>
                </section>

                <section name="governing_law">
                    <div className='__section__heading'>
                        GOVERNING LAW
                    </div>
                    <p>
                        These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Texas applicable to agreements made and to be entirely performed within the State of Texas, without regard to its conflict of law principles.
                    </p>
                </section>

                <section name="dispute_resolution">
                    <div className='__section__heading'>
                        DISPUTE RESOLUTION
                    </div>
                    <p><strong>Informal Negotiations</strong></p>
                    <p>
                        To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
                    </p>
                    <p><strong>Binding Arbitration</strong></p>
                    <p>
                        If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be
                        finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND
                        HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association
                        ("AAA") and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available
                        at the <a href='#'>American Arbitration Association (AAA) website</a>. Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA
                        Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. The arbitration may be conducted in person, through the submission of
                        documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by
                        either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise
                        required by the applicable AAA rules or applicable law, the arbitration will take place in Bexar, Texas. Except as otherwise provided herein, the
                        Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the
                        award entered by the arbitrator.
                    </p>
                    <p>
                        If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts
                        located in Bexar, Texas, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with
                        respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International
                        Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms.
                    </p>
                    <p>
                        In no event shall any Dispute brought by either Party related in any way to the Services be commenced more than one (1) years after the cause of
                        action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that
                        portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the
                        courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                    </p>
                    <p><strong>Restrictions</strong></p>
                    <p>
                        The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law,
                        (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action
                        basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative
                        capacity on behalf of the general public or any other persons.
                    </p>
                    <p><strong>Exceptions to Informal Negotiations and Arbitration</strong></p>
                    <p>
                        The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration:
                        (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any
                        Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive
                        relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that
                        portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the
                        courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                    </p>
                </section>




                <section name="corrections">
                    <div className='__section__heading'>
                        CORRECTIONS
                    </div>
                    <p>
                        There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                    </p>
                </section>

                <section name="disclaimer">
                    <div className='__section__heading'>
                        DISCLAIMER
                    </div>
                    <p>
                        THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZEDACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                    </p>
                </section>

                <section name="limitations_of_liability">
                    <div className='__section__heading'>
                        LIMITATIONS OF LIABILITY
                    </div>
                    <p>
                        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR $200.00 USD. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                    </p>
                </section>

                <section name="indemnification">
                    <div className='__section__heading'>
                        INDEMNIFICATION
                    </div>
                    <p>
                        You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
                    </p>
                </section>

                <section name="about_customer_user">
                    <div className='__section__heading'>
                        USER DATA
                    </div>
                    <p>
                        We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                    </p>
                </section>

                <section name="electronic_communications">
                    <div className='__section__heading'>
                        ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                    </div>
                    <p>

                        Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.

                    </p>
                </section>
                <section name="sms_text_messaging">
                    <div className='__section__heading'>
                        SMS TEXT MESSAGING
                    </div>
                    <p><strong>Opting Out</strong></p>
                    <p>
                        If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP.” You may receive an SMS message confirming your opt out.
                    </p>
                    <p><strong>Message and Data Rates</strong></p>
                    <p>
                        Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.
                    </p>
                    <p><strong>Support</strong></p>
                    <p>
                        If you have any questions or need assistance regarding our SMS communications, please email us at contact@vitalerp.com or call at 210-735-9900.
                    </p>
                </section>

                <section name="california_users">
                    <div className='__section__heading'>
                        CALIFORNIA USERS AND RESIDENTS
                    </div>
                    <p>
                        If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.


                    </p>
                </section>

                <section name="miscellaneous">
                    <div className='__section__heading'>
                        MISCELLANEOUS
                    </div>
                    <p>
                        These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
                    </p>
                </section>

                <section name="contact_us">
                    <div className='__section__heading'>
                        CONTACT US
                    </div>
                    <p>
                        In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                    </p>
                    <address>
                        <strong>Decypher</strong><br />
                        200 Concord Plaza <br />
                        San Antonio, TX 78216 <br />
                        United States <br />
                        Phone: 210-735-9900 <br />
                        Email: <a href="mailto:contact@vitalerp.com">contact@vitalerp.com</a>
                    </address>
                </section>


            </div >
        </div >
    );
}

export default TermsCondictions;