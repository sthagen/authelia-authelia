import { render } from '@react-email/render';
import * as React from "react";
import * as fs from "node:fs";

import Event from './emails/Event';
import IdentityVerificationJWT from "./emails/IdentityVerificationJWT";
import IdentityVerificationOTC from "./emails/IdentityVerificationOTC";

const optsHTML = {
	pretty: false,
	plainText: false,
};

const optsTXT = {
	pretty: false,
	plainText: true,
};

async function doRender() {
	const propsEvent = {
		title: "{{ .Title }}",
		displayName: "{{ .DisplayName }}",
        bodyPrefix: "{{ .BodyPrefix }}",
        bodyEvent: "{{ .BodyEvent }}",
        bodySuffix: "{{ .BodySuffix }}",
		remoteIP: "{{ .RemoteIP }}",
		detailsKey: "{{ $key }}",
		detailsValue: "{{ index $.Details $key }}",
		detailsPrefix: "{{- $keys := sortAlpha (keys .Details) }}{{- range $key := $keys }}",
		detailsSuffix: "{{ end }}",
	};

	fs.writeFileSync('../embed/notification/Event.html', await render(<Event {...propsEvent} />, optsHTML));
	fs.writeFileSync('../embed/notification/Event.txt', await render(<Event {...propsEvent} />, optsTXT));

	const propsJWT = {
		title: "{{ .Title }}",
		displayName: "{{ .DisplayName }}",
        domain: "{{ .Domain }}",
		remoteIP: "{{ .RemoteIP }}",
		link: "{{ .LinkURL }}",
		linkText: "{{ .LinkText }}",
		revocationLinkURL: "{{ .RevocationLinkURL }}",
		revocationLinkText: "{{ .RevocationLinkText }}",
	};

	fs.writeFileSync('../embed/notification/IdentityVerificationJWT.html', await render(<IdentityVerificationJWT {...propsJWT} />, optsHTML));
	fs.writeFileSync('../embed/notification/IdentityVerificationJWT.txt', await render(<IdentityVerificationJWT {...propsJWT} />, optsTXT));

	const propsOTC = {
		title: "{{ .Title }}",
		displayName: "{{ .DisplayName }}",
        domain: "{{ .Domain }}",
		remoteIP: "{{ .RemoteIP }}",
		oneTimeCode: "{{ .OneTimeCode }}",
		revocationLinkURL: "{{ .RevocationLinkURL }}",
		revocationLinkText: "{{ .RevocationLinkText }}",
	};

	fs.writeFileSync('../embed/notification/IdentityVerificationOTC.html', await render(<IdentityVerificationOTC {...propsOTC} />, optsHTML));
	fs.writeFileSync('../embed/notification/IdentityVerificationOTC.txt', await render(<IdentityVerificationOTC {...propsOTC} />, optsTXT));
}

doRender().then();


