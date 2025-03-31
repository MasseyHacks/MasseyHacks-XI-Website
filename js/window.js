/* function to change the tab content when clicked */
function changeTab(tabName, element, contentId) {
    // remove 'active' class from all tabs in the same window
    element.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // add 'active' class to the clicked tab
    element.classList.add('active');

    // get the correct content area
    const contentArea = document.getElementById(contentId);

    // variable to store the new content
    let newContent = "";
    let iframeHTML = "";

    // determine content based on the tab clicked
    if (tabName === "What is MasseyHacks?") {
        newContent = "MasseyHacks is a high school hackathon — an event perfect for students fascinated by the world of technology. This 24-hour event is an opportunity for students to explore the realm of computer science and bring their creative ideas to life by developing a project of their own. Never written a line of code in your life? Already created a robot to do your homework? No matter your skill level, we invite you to join us as a hacker to participate in workshops, engage in countless activities, and meet other like-minded students! Create memories and guide the story of your STEM journey at MasseyHacks XI!";
    } else if (tabName === "Location") {
        iframeHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.8704827993647!2d-83.03067432514656!3d42.259938341423066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c50a312539fbd%3A0x6f8247b9fd6a69fd!2sVincent%20Massey%20Secondary%20School!5e0!3m2!1sen!2sca!4v1743451648040!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    } else if (tabName === "Code of Conduct") {
        iframeHTML = '<iframe src="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" title="Code of Conduct"></iframe>';
    } else if (tabName === "General Info") {
        newContent = "Helpful information for the event!";
    } else if (tabName === "Hello World") {
        newContent = "Hello World";
    } else {
        newContent = "Content not found!";
    }

    // toggle padding based on the content type
    if (iframeHTML) {
        contentArea.classList.add('no-padding');
    } else {
        contentArea.classList.remove('no-padding');
    }

    // update the content area with the new content or iframe
    contentArea.innerHTML = iframeHTML || newContent;
}
