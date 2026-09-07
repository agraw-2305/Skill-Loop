import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";

import {
    useContext,
    useEffect,
    useRef
} from "react";

import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {

    const context = useContext(InterviewContext);

    const { interviewId } = useParams();

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    // Prevent duplicate PDF requests
    const pdfGeneratingRef = useRef(false);

    // =====================================================
    // GENERATE INTERVIEW REPORT
    // =====================================================

    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {

        setLoading(true);

        try {

            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            setReport(response.interviewReport);

            return response.interviewReport;

        } catch (error) {

            console.error(
                "Generate interview report failed:",
                error
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // GET REPORT BY ID
    // =====================================================

    const getReportById = async (id) => {

        if (!id) return;

        setLoading(true);

        try {

            const response =
                await getInterviewReportById(id);

            setReport(response.interviewReport);

            return response.interviewReport;

        } catch (error) {

            console.error(
                "Get interview report failed:",
                error
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // GET ALL REPORTS
    // =====================================================

    const getReports = async () => {

        setLoading(true);

        try {

            const response =
                await getAllInterviewReports();

            setReports(response.interviewReports);

            return response.interviewReports;

        } catch (error) {

            console.error(
                "Get interview reports failed:",
                error
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // DOWNLOAD RESUME PDF
    // =====================================================

    const getResumePdf = async (interviewReportId) => {

        // Prevent duplicate/concurrent requests
        if (pdfGeneratingRef.current) {
            console.log(
                "Resume PDF generation already in progress..."
            );
            return;
        }

        if (!interviewReportId) {
            console.error(
                "Interview report ID is missing."
            );
            return;
        }

        pdfGeneratingRef.current = true;

        setLoading(true);

        try {

            console.log(
                "Generating resume PDF for:",
                interviewReportId
            );

            const pdfData =
                await generateResumePdf({
                    interviewReportId
                });

            // Convert response into Blob
            const blob = new Blob(
                [pdfData],
                {
                    type: "application/pdf"
                }
            );

            // Create temporary URL
            const url =
                window.URL.createObjectURL(blob);

            // Create download link
            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `resume_${interviewReportId}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            // Give browser a moment before revoking
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);

            console.log(
                "Resume PDF downloaded successfully."
            );

        } catch (error) {

            console.error(
                "Resume PDF download failed:",
                error
            );

            throw error;

        } finally {

            pdfGeneratingRef.current = false;

            setLoading(false);
        }
    };

    // =====================================================
    // LOAD REPORTS
    // =====================================================

    useEffect(() => {

        if (interviewId) {

            getReportById(interviewId);

        } else {

            getReports();
        }

    }, [interviewId]);

    // =====================================================
    // RETURN
    // =====================================================

    return {
        loading,
        report,
        reports,

        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };
};