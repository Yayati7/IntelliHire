package com.intellihire.analytics.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Long totalUsers;

    private Long totalJobs;

    private Long totalApplications;

    private Long totalEvents;

    private Long recommendationEvents;

    private Long resumeUploads;

    private Long jobApplications;

    private Long jobPosts;

}