function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type Options = {
    expires?: Date | string;
    path?: string;
    "max-age"?: number;
};

function setCookie(name: string, value: string, options: Options) {
    options = {
        ...options,
        // path: "/",
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey as keyof Options];
        updatedCookie += "=" + optionValue;
    }
    console.log(updatedCookie);
    document.cookie = updatedCookie;
}

function deleteCookie(name: string) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
