selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/IP_address\"]": "<p>An <b>Internet Protocol address</b> is a numerical label such as <i><span class=\"ipaddr\"><span>192.0.2.1</span></span></i> that is connected to a computer network that uses the Internet Protocol for communication. An IP address serves two main functions: network interface identification, and location addressing.</p>", "a[href^=\"https://en.wikipedia.org/wiki/IP_address#\"]": "<p>An <b>Internet Protocol address</b> is a numerical label such as <i><span class=\"ipaddr\"><span>192.0.2.1</span></span></i> that is connected to a computer network that uses the Internet Protocol for communication. An IP address serves two main functions: network interface identification, and location addressing.</p>", "a[href=\"https://en.wikipedia.org/wiki/Port_(computer_networking)\"]": "<p>In computer networking, a <b>port</b> or <b>port number</b> is a number assigned to uniquely identify a connection endpoint and to direct data to a specific service. At the software level, within an operating system, a port is a logical construct that identifies a specific process or a type of network service. A port at the software level is identified for each transport protocol and address combination by the port number assigned to it. The most common transport protocols that use port numbers are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP); those port numbers are 16-bit unsigned numbers.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Port_(computer_networking)#\"]": "<p>In computer networking, a <b>port</b> or <b>port number</b> is a number assigned to uniquely identify a connection endpoint and to direct data to a specific service. At the software level, within an operating system, a port is a logical construct that identifies a specific process or a type of network service. A port at the software level is identified for each transport protocol and address combination by the port number assigned to it. The most common transport protocols that use port numbers are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP); those port numbers are 16-bit unsigned numbers.</p>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(` ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: true,
                placement: 'auto-start', maxWidth: 500, interactive: false,

            });
        };
    };
    console.log("tippy tips loaded!");
};
