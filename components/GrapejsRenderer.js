"use client";

import { useRenderer } from '@grapesjs/react';

export default function GrapesjsRenderer({ projectJson }) {
    const { Container } = useRenderer({
        projectData: projectJson,
    });

    return (
        <div className="grapesjs-renderer-wrapper">
            <Container />
        </div>
    );
}
