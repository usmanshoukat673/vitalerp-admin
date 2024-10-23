import React, { useEffect, useState } from 'react';

const DocumentWithMenu = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const grabHeadings = () => {
      const container = document.createElement('div');
      container.innerHTML = htmlContent;

      const headingElements = container.querySelectorAll('h1, h2, h3, h4');

      const extractedHeadings = [];

      headingElements.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1), 10); // Extract the heading level (1, 2, or 3)

        let parent = extractedHeadings;

        for (let i = 1; i < level; i++) {
          const lastChild = parent[parent.length - 1];

          if (!lastChild || !lastChild.children) {
            const newChild = { text: '', children: [] };
            parent.push(newChild);
            parent = newChild.children;
          } else {
            parent = lastChild.children;
          }
        }

        parent.push({
          text: heading.textContent,
          children: [],
        });
      });

      setHeadings(extractedHeadings);
    };

    grabHeadings();
  }, [htmlContent]);

  const renderHeadings = (headings) => (
    <ul className='__list'>
      {headings.map((heading, index) => (
        <li key={index}>
          {heading.text}
          {heading.children.length > 0 && renderHeadings(heading.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div>
        <h4 style={{marginBottom: '5px'}}>In this document</h4>
      </div>
      <div className='__menus'>
        {renderHeadings(headings)}
      </div>
    </div>
  );
};

export default DocumentWithMenu;
