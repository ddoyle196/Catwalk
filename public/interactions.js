/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
$(window).on('load', () => {
  $(document).on('click', (e) => {
    const { target } = e;
    const { className } = target;
    const classDecript = className.split(/[\s-]+/).filter((element) => element !== 'pointer' && element !== '');
    if (classDecript.length !== 0) {
      let widget = classDecript[0];
      const element = classDecript.filter((elm) => elm !== widget).join(' ');
      const time = new Date(Date.now()).toISOString();
      if (widget === 'qa') {
        widget = 'Questions & Answers';
      }
      if (widget === 'rr') {
        widget = 'Ratings & Reviews';
      }
      if (widget === 'ov') {
        widget = 'Overview';
      }
      const body = {
        widget,
        element,
        time,
      };
      // console.log(body);
      $.ajax({
        type: 'POST',
        url: '/interactions',
        data: JSON.stringify(body),
        success: () => {
          // console.log('success');
        },
        contentType: 'application/json',
      });
    }
  });
});
