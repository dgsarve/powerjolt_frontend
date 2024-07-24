'use client';
import React, { useEffect, useState } from 'react';

const JoltDocumentationPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Getting to Know Jolt</h1>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Overview</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt is a JSON to JSON transformation library. It is designed to transform JSON data
                        from one structure to another using a declarative specification. This documentation will
                        guide you through the core concepts and provide examples of how to use Jolt effectively.
                    </p>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Jolt Specification</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt uses a specification file to define transformations. The specification consists
                        of operations like &quot;shift&quot;, &quot;default&quot;, &quot;remove&quot;, and more. Each operation
                        has its own purpose and can be combined to achieve complex transformations.
                    </p>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Operation: Shift</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        The &quot;shift&quot; operation is the primary transformation operation in Jolt. It maps data from
                        one part of the input JSON structure to another part of the output JSON structure.
                        The shift operation is specified using a JSON object where you define a mapping of paths
                        from the input to the output.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "shift",
    "spec": {
        "input": {
            "nested": {
                "field": "outputField"
            }
        }
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Operation: Default</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        The &quot;default&quot; operation provides default values for fields that may be missing in the input
                        JSON. This ensures that the output JSON always contains the required fields, even if they
                        were not present in the input.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "default",
    "spec": {
        "outputField": "defaultValue"
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Operation: Remove</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        The &quot;remove&quot; operation deletes specified fields from the JSON. This can be used to
                        exclude unnecessary data from the output JSON.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "remove",
    "spec": {
        "fieldToRemove": ""
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Operation: Modify</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        The &quot;modify&quot; operation allows you to change the values of fields in the JSON structure.
                        This can be useful for data transformation that involves adjusting or calculating values.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "modify",
    "spec": {
        "fieldToModify": "newValue"
    }
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Examples</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Here are a few examples of how to use Jolt for different transformation scenarios:
                    </p>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Example 1: Simple Shift</h3>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "shift",
    "spec": {
        "inputField": "outputField"
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Example 2: Shift with Nested Fields</h3>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "shift",
    "spec": {
        "input": {
            "nested": {
                "field": "outputField"
            }
        }
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Example 3: Default Value</h3>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "default",
    "spec": {
        "outputField": "defaultValue"
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Example 4: Remove Field</h3>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "remove",
    "spec": {
        "fieldToRemove": ""
    }
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Additional Resources</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        For further details and advanced usage scenarios, consult the Jolt documentation
                        on the official website
                    </p>

                    <a href="https://github.com/bazaarvoice/jolt" className="text-blue-500">
                        jolt github link
                    </a>
                </section>
            </div>
        </div>
    );
};

export default JoltDocumentationPage;
